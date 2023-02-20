const Appointment = ({ index, appItem }) => {
  return (
    <div className='fs-event' key={index}>
      <p key={`event ${index}`} className='m-0'>
        {appItem.eventName}
      </p>
    </div>
  );
};

export default Appointment;
