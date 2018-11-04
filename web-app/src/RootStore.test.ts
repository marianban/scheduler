import { RootStore } from './RootStore';

it('can get appointment client name', () => {
  const rootStore = new RootStore(new Date());
  const client = rootStore.clientStore.create({
    fullName: 'Leonard Ban',
    phoneNumber: '0908000000',
    email: 'leo@gmail.com'
  });
  rootStore.appointmentsModel.create({
    date: '20/11/2018',
    time: '10:00',
    duration: 30,
    clientId: client.id
  });
  const appointment = rootStore.appointmentsModel.appointments[0];
  expect(appointment.getClientFullName(rootStore)).toBe('Leonard Ban');
});
