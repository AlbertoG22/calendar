import React, { useState } from 'react';


const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];


const Calendar2 = () => {

    const [currDate, setCurrDate] = useState(new Date());

    let currMonth = currDate.getMonth();
    let currYear = currDate.getFullYear();

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
                key: `${months[currMonth]} ${i}`, 
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
            <tr className='row' key={index}>
                {array.map((elemento, i) => (
                    <td
                        key={ elemento[0].key } 
                        className={ `col ${elemento[0].className}` }
                        onClick={handleDay}
                    >
                        { elemento[0].value }
                    </td>
                ))}
            </tr>
        ));

        return daysOfMonth;
    };


    const handlePrevNext = (event) => {
        currMonth = event.target.id === "prev" ? currMonth - 1 : currMonth + 1;
        setCurrDate(new Date(currYear, currMonth));
    };

    const handleDay = (event) => {
        console.log(` ${event.target.textContent}`);
    };

    return (
        <>
            <div className="container">
                <div className="header row">
                    <div className="tittle col">
                        <p>Mes año</p>
                    </div>
                    <div className="buttons col-2">
                        <button>prev</button>
                        <button>next</button>
                    </div>
                </div>

                <div className="calendar container">
                    <div className="calendar-header row">
                        <div className="col d-flex align-items-center justify-content-center">
                            <div className='row'>Sun</div>
                        </div>
                        <div className="col d-flex align-items-center justify-content-center">
                            <div className='row'>Mon</div>
                        </div>
                        <div className="col d-flex align-items-center justify-content-center">
                            <div className='row'>Tue</div>
                        </div>
                        <div className="col d-flex align-items-center justify-content-center">
                            <div className='row'>Wed</div>
                        </div>
                        <div className="col d-flex align-items-center justify-content-center">
                            <div className='row'>Thu</div>
                        </div>
                        <div className="col d-flex align-items-center justify-content-center">
                            <div className='row'>Fri</div>
                        </div>
                        <div className="col d-flex align-items-center justify-content-center">
                            <div className='row'>Sat</div>
                        </div>
                    </div>
                    <div className="calendar-days">
                        <div className="week-1 row">
                            <p className='col d-flex align-items-center justify-content-center'>1</p>
                            <p className='col d-flex align-items-center justify-content-center'>2</p>
                            <p className='col d-flex align-items-center justify-content-center'>3</p>
                            <p className='col d-flex align-items-center justify-content-center'>4</p>
                            <p className='col d-flex align-items-center justify-content-center'>5</p>
                            <p className='col d-flex align-items-center justify-content-center'>6</p>
                            <p className='col d-flex align-items-center justify-content-center'>7</p>
                        </div>
                        <div className="week-1 row">
                            <p className='col d-flex align-items-center justify-content-center'>8</p>
                            <p className='col d-flex align-items-center justify-content-center'>9</p>
                            <p className='col d-flex align-items-center justify-content-center'>10</p>
                            <p className='col d-flex align-items-center justify-content-center'>11</p>
                            <p className='col d-flex align-items-center justify-content-center'>12</p>
                            <p className='col d-flex align-items-center justify-content-center'>13</p>
                            <p className='col d-flex align-items-center justify-content-center'>14</p>
                        </div>
                        <div className="week-1 row">
                            <p className='col d-flex align-items-center justify-content-center'>15</p>
                            <p className='col d-flex align-items-center justify-content-center'>16</p>
                            <p className='col d-flex align-items-center justify-content-center'>17</p>
                            <p className='col d-flex align-items-center justify-content-center'>18</p>
                            <p className='col d-flex align-items-center justify-content-center'>19</p>
                            <p className='col d-flex align-items-center justify-content-center'>20</p>
                            <p className='col d-flex align-items-center justify-content-center'>21</p>
                        </div>
                        <div className="week-1 row">
                            <p className='col d-flex align-items-center justify-content-center'>22</p>
                            <p className='col d-flex align-items-center justify-content-center'>23</p>
                            <p className='col d-flex align-items-center justify-content-center'>24</p>
                            <p className='col d-flex align-items-center justify-content-center'>25</p>
                            <p className='col d-flex align-items-center justify-content-center'>26</p>
                            <p className='col d-flex align-items-center justify-content-center'>27</p>
                            <p className='col d-flex align-items-center justify-content-center'>28</p>
                        </div>
                        <div className="week-1 row">
                            <p className='col d-flex align-items-center justify-content-center'>29</p>
                            <p className='col d-flex align-items-center justify-content-center'>30</p>
                            <p className='col d-flex align-items-center justify-content-center'>31</p>
                            <p className='col d-flex align-items-center justify-content-center'>1</p>
                            <p className='col d-flex align-items-center justify-content-center'>2</p>
                            <p className='col d-flex align-items-center justify-content-center'>3</p>
                            <p className='col d-flex align-items-center justify-content-center'>4</p>
                        </div>
                        {/* ... */}
                    </div>
                </div>
            </div>


            <div className='container'>
                <header className=''>
                    <div className='d-flex justify-content-around'>
                        <p className='current-date'>{`${months[currMonth]} ${currYear}`}</p>
                        <div>
                            <button type="button" id="prev" className='btn btn-light' onClick={handlePrevNext}>prev</button>
                            <button type="button" id="next" className='btn btn-light' onClick={handlePrevNext}>next</button>
                        </div>
                    </div>
                </header>

                <table className='calendar'>
                    <div className="container">
                        <thead className='weeks'>
                            <tr className='row d-flex justify-content-around'>
                                { weekDays.map((day, i) => (
                                    <th key={i} scope="col">{ day }</th>
                                )) }
                            </tr>
                        </thead>
                        <tbody className='days'>
                            { renderCalendar() }
                        </tbody>
                    </div>
                </table>

            </div>
        </>
    );
};

export default Calendar2;