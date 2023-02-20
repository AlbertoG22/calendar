
const Week = ({ day, addNewAppointment, renderAppointment }) => {
  return (
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
  );
};

export default Week;