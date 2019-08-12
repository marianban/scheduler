import { AppointmentModel } from 'appointments/AppointmentModel';
import { AppointmentsModel } from '../AppointmentsModel';

it('should update appointment and call update callback', () => {
  const appointmentsModel = new AppointmentsModel();
  const createdAppointment = appointmentsModel.create({
    date: '6/8/2019',
    time: '10:00',
    duration: 60
  });
  expect(appointmentsModel.appointments).toHaveLength(1);
  appointmentsModel.update(createdAppointment, { duration: 30 });
  appointmentsModel.onAppointmentUpdated(
    (updatedAppointment: Readonly<AppointmentModel>) => {
      expect(updatedAppointment.duration).toBe(30);
    }
  );
});
