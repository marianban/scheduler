import { ClientModel } from 'clients/ClientModel';
import { RootStore } from './RootStore';

it('can get appointment client name', () => {
  const rootStore = new RootStore(new Date());
  const client = new ClientModel('Leonard Ban', '0908000000', 'leo@gmail.com');
  rootStore.clientStore.create(client);
  rootStore.appointmentsModel.create({
    date: '20/11/2018',
    time: '10:00',
    clientId: client.id
  });
  const appointment = rootStore.appointmentsModel.appointments[0];
  expect(appointment.getClientFullName(rootStore)).toBe('Leonard Ban');
});
