import { AppointmentModel } from '../AppointmentModel';

it('can be constructed', () => {
  const date = new Date(2017, 9, 20, 13, 15);
  const appointment = new AppointmentModel(date, 30);
  expect(appointment.dateTime.getFullYear()).toEqual(2017);
  expect(appointment.dateTime.getMonth()).toEqual(9);
  expect(appointment.dateTime.getDate()).toEqual(20);
  expect(appointment.dateTime.getHours()).toEqual(13);
  expect(appointment.dateTime.getMinutes()).toEqual(15);
});

it('should update time', () => {
  const date = new Date(2017, 9, 20, 13, 15);
  const appointment = new AppointmentModel(date, 30);
  appointment.update({ date: '20/10/2017', time: '06:00', duration: 30 });
  expect(appointment.dateTime.getFullYear()).toEqual(2017);
  expect(appointment.dateTime.getMonth()).toEqual(9);
  expect(appointment.dateTime.getDate()).toEqual(20);
  expect(appointment.dateTime.getHours()).toEqual(6);
  expect(appointment.dateTime.getMinutes()).toEqual(0);
});

it('should update date', () => {
  const date = new Date(2017, 9, 20, 13, 15);
  const appointment = new AppointmentModel(date, 30);
  appointment.update({ date: '10/1/2018', time: '13:15', duration: 30 });
  expect(appointment.dateTime.getFullYear()).toEqual(2018);
  expect(appointment.dateTime.getMonth()).toEqual(0);
  expect(appointment.dateTime.getDate()).toEqual(10);
  expect(appointment.dateTime.getHours()).toEqual(13);
  expect(appointment.dateTime.getMinutes()).toEqual(15);
});
