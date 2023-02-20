import { months } from "./data/months-days";

const CalendarHeader = ({
  currYear,
  currMonth,
  handlePrevNext,
  setCurrDate,
}) => {
  return (
    <header className="header container row mb-2 mt-5">
      <div className="buttons col-3 d-flex justify-content-around mr-5">
        <button
          type="button"
          id="prev"
          className="btn btn-light btn-sm"
          onClick={handlePrevNext}
        >
          prev
        </button>
        <button
          type="button"
          id="next"
          className="btn btn-light btn-sm"
          onClick={handlePrevNext}
        >
          next
        </button>
        <button
          type="button"
          id="today"
          className="btn btn-info btn-sm"
          onClick={() => setCurrDate(new Date())}
        >
          today
        </button>
      </div>
      <div className="tittle col d-flex justify-content-center">
        <h4 className="current-date">{`${currYear} ${months[currMonth]}`}</h4>
      </div>
    </header>
  );
};

export default CalendarHeader;
