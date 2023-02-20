import { useEffect, useState } from 'react';
import { months } from './data/months-days';
import CalendarContent from './CalendarContent';
import CalendarHeader from './CalendarHeader';
import Week from './Week';
import Appointment from './Appointment';

const Calendar = () => {
  const [currDate, setCurrDate] = useState(new Date());
  const [appointments, setAppointments] = useState(
    localStorage.getItem('appointment')
      ? JSON.parse(localStorage.getItem('appointment'))
      : []
  );
  const [personalAppointments, setPersonalAppointments] = useState(
    localStorage.getItem('appointment')
      ? JSON.parse(localStorage.getItem('appointment'))
      : []
  );

  let currMonth = currDate.getMonth();
  let currYear = currDate.getFullYear();

  useEffect(() => {
    getCloudAppointments();
  }, []);

  // fetch appointments from API
  const getCloudAppointments = async () => {
    const res = await fetch(
      'https://altomobile.blob.core.windows.net/api/test.json'
    );
    const data = await res.json();

    const eventsArray = data.map((item) => {
      let date = new Date(item.time);
      return {
        eventDate: `${date.getDate()} ${
          date.getMonth() + 1
        } ${date.getFullYear()}`,
        eventName: item.name,
      };
    });
    setAppointments([...appointments, ...eventsArray]);
  };

  // get the calendar days (previous, current and next) and order them in weeks
  const renderCalendar = () => {
    let lastDateOfMonth = new Date(currYear, currMonth + 1, 0).getDate(); // number of days of the month
    let lastDateOfPrevMonth = new Date(currYear, currMonth, 0).getDate(); // number of days in the prevMonth
    let firstDayOfMonth = new Date(currYear, currMonth, 1).getDay(); // day of the week that starts the month (0-6)
    let lastDayOfMonth = new Date(
      currYear,
      currMonth,
      lastDateOfMonth
    ).getDay(); // last day of the week of the prevMonth

    let tdTag = [];

    // get last days of the prevMonth
    for (let i = firstDayOfMonth; i > 0; i--) {
      tdTag.push([
        {
          key: `${lastDateOfPrevMonth - i + 1} ${currMonth} ${currYear}`,
          className: 'inactive',
          value: lastDateOfPrevMonth - i + 1,
        },
      ]);
    }

    // get days of the currMonth
    for (let i = 1; i <= lastDateOfMonth; i++) {
      // add 'active' class in the current day only
      let isToday =
        i === currDate.getDate() &&
        currMonth === new Date().getMonth() &&
        currYear === new Date().getFullYear()
          ? 'active'
          : '';
      tdTag.push([
        {
          key: `${i} ${currMonth + 1} ${currYear}`,
          className: isToday,
          value: i,
        },
      ]);
    }

    // get first days of the nextMonth
    for (let i = lastDayOfMonth; i < 6; i++) {
      tdTag.push([
        {
          key: `${i - lastDayOfMonth + 1} ${currMonth + 2} ${currYear}`,
          className: 'inactive',
          value: i - lastDayOfMonth + 1,
        },
      ]);
    }

    // separate days into weeks (7days)
    const separatedArrays = [];
    while (tdTag.length > 0) {
      separatedArrays.push(tdTag.splice(0, 7));
    }

    // render weeks
    const daysOfMonth = separatedArrays.map((week, index) => (
      <tr
        className='row border '
        key={`${months[currMonth]} ${currYear} week-${index}`}
      >
        {week.map((day) => (
          <Week
            day={day}
            addNewAppointment={addNewAppointment}
            renderAppointment={renderAppointment}
          />
        ))}
      </tr>
    ));

    return daysOfMonth;
  };

  const handlePrevNext = (e) => {
    currMonth = e.target.id === 'prev' ? currMonth - 1 : currMonth + 1;
    // always have the real current day
    if (
      currMonth === new Date().getMonth() &&
      currYear === new Date().getFullYear()
    ) {
      setCurrDate(new Date());
    } else {
      setCurrDate(new Date(currYear, currMonth));
    }
  };

  // create new appointment and add it to the state
  const addNewAppointment = (e) => {
    const newAppointment = prompt('Event description:');
    if (!newAppointment) return;

    const newEvent = {
      eventDate: e.target.getAttribute('data-index'),
      eventName: newAppointment,
    };

    setPersonalAppointments([...personalAppointments, { ...newEvent }]);
    let allEvents = JSON.stringify([...personalAppointments, { ...newEvent }]);
    localStorage.setItem('appointment', allEvents);

    setAppointments([...appointments, { ...newEvent }]);
  };

  // render appointments on the calendar
  const renderAppointment = (date) => {
    let eventsArray = [];
    appointments.map((appItem, index) => {
      if (!appItem.eventName) return;

      if (date === appItem.eventDate) {
        eventsArray.push(<Appointment index={index} appItem={appItem} />);
      }
    });
    return eventsArray;
  };

  return (
    <>
      <div className='mb-5'>
        <CalendarHeader
          currYear={currYear}
          currMonth={currMonth}
          handlePrevNext={handlePrevNext}
          setCurrDate={setCurrDate}
        />
        <CalendarContent renderCalendar={renderCalendar} />
      </div>
    </>
  );
};

export default Calendar;
