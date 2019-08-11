import React from 'react';
import NextAppointment from './NextAppointment';
import './NextAppointments.css';

const NextAppointments = () => {
  return (
    <div className="next__appointments">
      <h2>Today</h2>
      <NextAppointment />
      <NextAppointment />
    </div>
  );
};

export default NextAppointments;
