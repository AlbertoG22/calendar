import { weekDays } from "./data/months-days";

const CalendarContent = ({ renderCalendar }) => {
  return (
    <table className="calendar ">
      <thead className="calendar-header row mt-3 border-top border-left">
        {weekDays.map((day, i) => (
          <tr
            key={day}
            className="col border-right d-flex align-items-center justify-content-center"
          >
            <th key={`day ${i}`} scope="col">
              {day}
            </th>
          </tr>
        ))}
      </thead>

      <tbody>{renderCalendar()}</tbody>
    </table>
  );
};

export default CalendarContent;
