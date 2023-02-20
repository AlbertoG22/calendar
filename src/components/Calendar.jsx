import React, { useEffect, useState } from 'react';
import { months, weekDays } from './data/months-days';

const Calendar = () => {
    const [currDate, setCurrDate] = useState(new Date());
    const [appointments, setAppointments] = useState(localStorage.getItem('appointment') ? JSON.parse(localStorage.getItem('appointment')) : []);
    const [ personalAppointments, setPersonalAppointments ] = useState(localStorage.getItem('appointment') ? JSON.parse(localStorage.getItem('appointment')) : []);

    let currMonth = currDate.getMonth();
    let currYear = currDate.getFullYear();

    useEffect(() => {
        getCloudAppointments();
    }, []);

    // fetch appointments from API
    const getCloudAppointments = async () => {
        const res = await fetch('https://altomobile.blob.core.windows.net/api/test.json');
        const data = await res.json();

        const eventsArray = data.map(item => {
            let date = new Date(item.time);
            return {
                eventDate: `${date.getDate()} ${date.getMonth() + 1} ${date.getFullYear()}`,
                eventName: item.name
            };
        });
        setAppointments([...appointments, ...eventsArray]);
    };

    // get the calendar days (previous, current and next) and order them in weeks
    const renderCalendar = () => {
        let lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate(); // number of days of the month
        let lastDateOfPrevMonth = new Date(currYear, currMonth, 0).getDate(); // number of days in the prevMonth
        let firstDayOfMonth = new Date(currYear, currMonth, 1).getDay(); // day of the week that starts the month (0-6)
        let lastDayOfMonth = new Date(currYear, currMonth, lastDateOfMonth).getDay(); // last day of the week of the prevMonth

        let tdTag = [];

        // get last days of the prevMonth
        for(let i = firstDayOfMonth; i > 0; i--) {
            tdTag.push([{  
                key : `${lastDateOfPrevMonth - i + 1} ${currMonth} ${currYear}`,
                className: 'inactive', 
                value: lastDateOfPrevMonth - i + 1
            }]);
        }

        // get days of the currMonth
        for(let i = 1; i <= lastDateOfMonth; i++) {
            // add 'active' class in the current day only
            let isToday = i === currDate.getDate() && currMonth === new Date().getMonth() && currYear === new Date().getFullYear() ? 'active' : '';
            tdTag.push([ { 
                key: `${i} ${currMonth + 1} ${currYear}`, 
                className: isToday, 
                value: i
            } ]);
        }

        // get first days of the nextMonth
        for(let i = lastDayOfMonth; i < 6; i++) {
            tdTag.push([ { 
                key: `${i - lastDayOfMonth + 1} ${currMonth + 2} ${currYear}`,
                className: "inactive", 
                value: i - lastDayOfMonth + 1
            } ]);
        }

        // separate days into weeks (7days)
        const separatedArrays = [];
        while (tdTag.length > 0) {
            separatedArrays.push(tdTag.splice(0, 7));
        }

        // render weeks
        const daysOfMonth = separatedArrays.map((week, index) => (
            <tr className='row border ' key={`${months[currMonth]} ${currYear} week-${index}`}>
                { week.map((day, i) => (
                    <>
                        <div 
                            key={ day[0].key } 
                            data-index={ day[0].key }
                            className={ `week calendar-days ${day[0].className} col border-right p-0` }
                            onDoubleClick={addNewAppointment}
                        >
                            <div className='col' key={`${day[0].value}`}>
                                <td
                                    key={ `day ${day[0].value}` } 
                                    className='d-flex align-items-start justify-content-end'
                                >
                                    { day[0].value }
                                </td>
                                { renderAppointment(day[0].key) }
                            </div>
                        </div>
                    </>
                )) }
            </tr>
        ));

        return daysOfMonth;
    };

    const handlePrevNext = (e) => {
        currMonth = e.target.id === "prev" ? currMonth - 1 : currMonth + 1;
        // always have the real current day
        if(currMonth === new Date().getMonth() && currYear === new Date().getFullYear()) {
            setCurrDate(new Date());
        } else {
            setCurrDate(new Date(currYear, currMonth));
        }
    };

    // create new appointment and add it to the state
    const addNewAppointment = (e) => {
        const newAppointment = prompt('Event description:');
        if(!newAppointment) return;
        
        const newEvent = {
            eventDate: e.target.getAttribute('data-index'),
            eventName: newAppointment
        };
        
        setPersonalAppointments([...personalAppointments, {...newEvent}]);
        let allEvents = JSON.stringify([...personalAppointments, {...newEvent}]);
        localStorage.setItem('appointment', allEvents);
        
        setAppointments([...appointments, {...newEvent}]);
    };

    // render appointments on the calendar
    const renderAppointment = (date) => {
        let eventsArray = [];

        appointments.map((appItem, index) => {
            if(!appItem.eventName) return;

            if(date === appItem.eventDate) {
                eventsArray.push(
                    <div className='fs-event' key={index}>
                        <p key={`event ${index}`} className='m-0'>{appItem.eventName}</p>
                    </div>
                );
            }

        });
        return eventsArray;
    }

    return (
        <>
            <div className="mb-5">
                <header className='header container row mb-2 mt-5'>
                    <div className='buttons col-3 d-flex justify-content-around mr-5' >
                        <button type="button" id="prev" className='btn btn-light btn-sm' onClick={handlePrevNext}>prev</button>
                        <button type="button" id="next" className='btn btn-light btn-sm' onClick={handlePrevNext}>next</button>
                        <button type="button" id="today" className='btn btn-info btn-sm' onClick={() => setCurrDate(new Date())}>today</button>
                    </div>
                    <div className="tittle col d-flex justify-content-center">
                        <h4 className='current-date'>{`${currYear} ${months[currMonth]}`}</h4>
                    </div>
                </header>

                <table className="calendar ">
                    <thead className="calendar-header row mt-3 border-top border-left">
                        { weekDays.map((day, i) => (
                            <tr key={day} className="col border-right d-flex align-items-center justify-content-center">
                                <th key={`day ${i}`} scope="col" >{ day }</th>
                            </tr>
                        )) }
                    </thead>

                    <tbody className="">
                        { renderCalendar() }
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default Calendar;