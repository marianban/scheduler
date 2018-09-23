import * as React from 'react';
import NextAppointment from './NextAppointment';
import './NextAppointments.css';

const NextAppointments = () => {
  return (    
      <div className="next__appointments">
        <h3>Today</h3>
        <NextAppointment />
        <NextAppointment />
      </div>
  );
};

export default NextAppointments;
