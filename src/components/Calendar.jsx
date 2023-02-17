import React, { useEffect, useState } from 'react';
import '../styles/styles.css';

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const Calendar = () => {

  const [date, setDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    // let date = new Date();
    // let currYear = date.getFullYear();
    // let currMonth = date.getMonth();

    // renderCalendar();
    console.log(date);
    console.log(currentMonth);
    console.log(currentYear);
  }, []);

  const renderCalendar = () => {
    let currYear = date.getFullYear();
    let currMonth = date.getMonth();
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

    // // ciclo para los días del mes
    for(let i = 1; i <= lastDateOfMonth; i++) {
      // revisar si es el día actual
      let isToday = i === date.getDate() && currMonth === new Date().getMonth() && currYear === new Date().getFullYear() ? 'active' : '';
      // tdTag.push(<td key={`${currMonth} ${i}`} className={isToday}>{i}</td>);
      tdTag.push([ { 
        key: `${months[currMonth]} ${i}`, 
        className: isToday, 
        value: i
      } ]);
    }

    // // ciclo para los primeros días del siguiente mes
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
          // console.log(elemento[0], i)
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



    // currentDate.innerHTML = `${months[date.getMonth()]} ${date.getFullYear()}`;
    // daysTag.innerHTML = liTag;
  };


  const handlePrevNext = (event) => {
    // console.log(event.target.id);
    if(event.target.id === "prev") {
      setCurrentMonth( currentMonth - 1);
    } else {
      setCurrentMonth( currentMonth + 1);
    }

    if(currentMonth < 0 || currentMonth > 11) {
      let date = new Date(currentYear, currentMonth);
      setDate(date);
      setCurrentMonth(date.getFullYear());
      setCurrentYear(date.getMonth());
    } else {
      setDate(new Date());
    }
  };

  const handleNext = (event) => {
    if((currentMonth + 1) < 0 || (currentMonth + 1) > 11) {
      let date = new Date(currentYear, currentMonth);
      setDate(date);
      setCurrentMonth(date.getFullYear());
      setCurrentYear(date.getMonth());
    } else {
      setDate(new Date());
    }
    setCurrentMonth( currentMonth + 1)
  };

  const handlePrev = (event) => {
    if((currentMonth - 1) < 0 || (currentMonth - 1) > 11) {
      let date = new Date(currentYear, currentMonth);
      setDate(date);
      setCurrentMonth(date.getFullYear());
      setCurrentYear(date.getMonth());
    } else {
      setDate(new Date());
    }
    setCurrentMonth( currentMonth - 1);
  };

  const handleDay = (event) => {
    console.log(` ${event.target.textContent}`);
  };

  return (
    <>
      <div className='container'>
        <header>
          <div className='header'>
            <p className='current-date'>{`${months[currentMonth]} ${currentYear}`}</p>
            <button type="button" id="prev" className='btn btn-light' onClick={handlePrevNext}>prev</button>
            <button type="button" id="next" className='btn btn-light' onClick={handlePrevNext}>next</button>
          </div>
        </header>

        <table className=' calendar'>
          <thead className='weeks'>
              {/* d-flex justify-content-around */}
            <tr className='row d-flex justify-content-around'>
              { weekDays.map(day => (
                <th scope="col">{ day }</th>
              )) }
            </tr>
          </thead>
          <tbody className='days'>
            
            { renderCalendar() }
            
          </tbody>
        </table>

      </div>
    </>
  );
};

export default Calendar;