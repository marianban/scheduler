import { AppointmentModel } from '../AppointmentModel';

it('can be constructed', () => {
  const appointment = new AppointmentModel('20/10/2017', '13:15');
  expect(appointment.dateTime.getFullYear()).toEqual(2017);
  expect(appointment.dateTime.getMonth()).toEqual(9);
  expect(appointment.dateTime.getDate()).toEqual(20);
  expect(appointment.dateTime.getHours()).toEqual(13);
  expect(appointment.dateTime.getMinutes()).toEqual(15);
});

it.only('can be constructed without time', () => {
  const appointment = new AppointmentModel('20/10/2017', '');
  expect(appointment.dateTime.getFullYear()).toEqual(2017);
  expect(appointment.dateTime.getMonth()).toEqual(9);
  expect(appointment.dateTime.getDate()).toEqual(20);
  expect(appointment.dateTime.getHours()).toEqual(0);
  expect(appointment.dateTime.getMinutes()).toEqual(0);
});

it('should update time', () => {
  const appointment = new AppointmentModel('20/10/2017', '13:15');
  appointment.update({ date: '20.10.2017', time: '06:00' });
  expect(appointment.dateTime.getFullYear()).toEqual(2017);
  expect(appointment.dateTime.getMonth()).toEqual(9);
  expect(appointment.dateTime.getDate()).toEqual(20);
  expect(appointment.dateTime.getHours()).toEqual(6);
  expect(appointment.dateTime.getMinutes()).toEqual(0);
});

it('should update date', () => {
  const appointment = new AppointmentModel('20/10/2017', '13:15');
  appointment.update({ date: '10.1.2018', time: '13:15' });
  expect(appointment.dateTime.getFullYear()).toEqual(2018);
  expect(appointment.dateTime.getMonth()).toEqual(0);
  expect(appointment.dateTime.getDate()).toEqual(10);
  expect(appointment.dateTime.getHours()).toEqual(13);
  expect(appointment.dateTime.getMinutes()).toEqual(15);
});
