import React, { useEffect, useState } from 'react';


const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];


const Calendar2 = () => {

    const [currDate, setCurrDate] = useState(new Date());
    const [events, setEvents] = useState([]);

    let currMonth = currDate.getMonth();
    let currYear = currDate.getFullYear();
    console.log(events);

    useEffect(() => {

        getEventsData();

    }, []);
    
    const getEventsData = async () => {
        const response = await fetch('https://altomobile.blob.core.windows.net/api/test.json')
        const data = await response.json();

        const eventsArray = data.map(item => {
            let date = new Date(item.time);

            return {
                date: `${date.getDate()} ${date.getMonth() + 1} ${date.getFullYear()}`,
                // time: `${date.getHours() + 6}:${date.getMinutes()}`,
                eventName: item.name
            };
        });
        // console.log(eventsArray);
        setEvents([...events, ...eventsArray]);
    };


    const renderCalendar = () => {
        let lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate(); // días que tiene el mes
        let lastDateOfPrevMonth = new Date(currYear, currMonth, 0).getDate(); // días que tiene el mes anterior
        let firstDayOfMonth = new Date(currYear, currMonth, 1).getDay(); // día de la semana que inicia el mes (0-6)
        let lastDayOfMonth = new Date(currYear, currMonth, lastDateOfMonth).getDay(); // último día de la semana del mes anterior

        let tdTag = [];

        // ciclo para los últimos días del mes previo
        for(let i = firstDayOfMonth; i > 0; i--) {
            // tdTag.push(<td key={`${currMonth} ${i}`} className="inactive">{lastDateOfPrevMonth - i + 1}</td>);
            tdTag.push([ { 
                key: `${months[currMonth-1]} ${lastDateOfPrevMonth - i + 1}`, 
                className: "inactive", 
                value: lastDateOfPrevMonth - i + 1
            } ]);
        }

        // ciclo para los días del mes
        for(let i = 1; i <= lastDateOfMonth; i++) {
            // revisar si es el día actual
            let isToday = i === currDate.getDate() && currMonth === new Date().getMonth() && currYear === new Date().getFullYear() ? 'active' : '';
            // tdTag.push(<td key={`${currMonth} ${i}`} className={isToday}>{i}</td>);
            tdTag.push([ { 
                // key: `${months[currMonth]} ${i}`, 
                key: `${i} ${currMonth+1} ${currYear}`, 
                className: isToday, 
                value: i
            } ]);
        }

        // ciclo para los primeros días del siguiente mes
        for(let i = lastDayOfMonth; i < 6; i++) {
            // tdTag.push(<td key={`${currMonth} ${i}`} className="inactive">{i - lastDayOfMonth + 1}</td>);
            tdTag.push([ { 
                key: `${months[currMonth+1]} ${i - lastDayOfMonth + 1}`, 
                className: "inactive", 
                value: i - lastDayOfMonth + 1
            } ]);
        }

        const separatedArrays = [];
    
        while (tdTag.length > 0) {
            separatedArrays.push(tdTag.splice(0, 7));
        }

        const daysOfMonth = separatedArrays.map((array, index) => (
            <tr className='row border' key={index}>
                { array.map((elemento, i) => (
                    <>
                        {/* si el día (key) es igual al del evento (en el obj), se muestra, si no no  */}
                        {/* <div className={elemento[0].className}>hola</div> */}
                        {/* { console.log(elemento[0].key) } */}
                        { showEvent(elemento[0].key) }
                        <td
                            key={ elemento[0].key } 
                            data-index={ elemento[0].key }
                            className={ `calendar-days ${elemento[0].className} col d-flex align-items-start justify-content-end border-right` }
                            onDoubleClick={handleDay}
                        >
                            { elemento[0].value }
                        </td>
                    </>
                )) }
            </tr>
        ));

        return daysOfMonth;
    };


    const handlePrevNext = (event) => {
        currMonth = event.target.id === "prev" ? currMonth - 1 : currMonth + 1;
        // always have the actual current day
        if(currMonth === new Date().getMonth() && currYear === new Date().getFullYear()) {
            setCurrDate(new Date());
        } else {
            setCurrDate(new Date(currYear, currMonth));
        }
    };

    const handleDay = (event) => {
        // const time = prompt('Set the hour for the event:\nFormat: HH:mm');
        const newAppointment = prompt('Event description:');
        console.log(newAppointment);
        console.log(event.target.getAttribute('data-index'));
        const newEvent = {
            date: event.target.getAttribute('data-index'),
            eventName: newAppointment
        };
        // console.log(` ${event.target.textContent}`);
        
        setEvents([...events, {...newEvent}]);
        // console.log(newEvent);
    };

    const showEvent = (date) => {
        let eventsArray = [];
        events.map(event => {
            if(!event.eventName) return;

            if(date === event.date) {
                eventsArray.push(
                    <div className='event'>
                        <p>{event.eventName}</p>
                    </div>
                );
            }

        });
        return eventsArray;
    }

    return (
        <>
            <div className="container">
                <header className='header row mb-2 mt-5'>
                    <div className="tittle col">
                        <h4 className='current-date'>{`${months[currMonth]} ${currYear}`}</h4>
                    </div>
                    <div className='buttons col-3 d-flex justify-content-between'>
                        <button type="button" id="prev" className='btn btn-light' onClick={handlePrevNext}>prev</button>
                        <button type="button" id="next" className='btn btn-light' onClick={handlePrevNext}>next</button>
                        <button type="button" id="today" className='btn btn-success' onClick={() => setCurrDate(new Date())}>today</button>
                    </div>
                </header>

                <table className="calendar container">
                    <thead className="calendar-header row mt-3 border-top border-left">
                        { weekDays.map((day, i) => (
                            <tr className="col border-right d-flex align-items-center justify-content-center">
                                <th key={i} scope="col" >{ day }</th>
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

export default Calendar2;