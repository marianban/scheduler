import { ClientModel } from 'clients/ClientModel';
import { configure } from 'mobx';
import { ClientStore } from '../ClientStore';

configure({
  enforceActions: 'always'
});

it("creates new client if doesn't exists", () => {
  const store = new ClientStore();
  expect(store.clients.length).toBe(0);
  store.create(new ClientModel('Jimmy', '1234', 'jimmy@gmail.com'));
  store.create(new ClientModel('Hans', '1234', 'hans@gmail.com'));
  expect(store.clients.length).toBe(2);
});

it("cant't create clients with duplicate ids", () => {
  const store = new ClientStore();
  expect(store.clients.length).toBe(0);
  const client = store.create({
    fullName: 'Jimmy',
    phoneNumber: '1234',
    email: 'immy@gmail.com'
  });
  expect(() => {
    store.create(client);
  }).toThrowErrorMatchingSnapshot();
});

it('updates client if already exists', () => {
  const store = new ClientStore();
  const client = store.create({
    fullName: 'Jimmy',
    phoneNumber: '1234',
    email: 'immy@gmail.com'
  });
  client.update({ phoneNumber: '3451' });
  expect(store.clients.length).toBe(1);
  expect(store.clients[0].phoneNumber).toBe('3451');
});

it('can set field to empty string', () => {
  const store = new ClientStore();
  const client = store.create({
    fullName: 'Jimmy',
    phoneNumber: '1234',
    email: 'immy@gmail.com'
  });
  client.update({ phoneNumber: '' });
  expect(store.clients.length).toBe(1);
  expect(store.clients[0].phoneNumber).toBe('');
});

it('can delete client', () => {
  const store = new ClientStore();
  expect(store.clients.length).toBe(0);
  const client = store.create({
    fullName: 'Jimmy',
    phoneNumber: '1234',
    email: 'immy@gmail.com'
  });
  store.deleteById(client.id);
  expect(store.clients.length).toBe(0);
});

it('can identify existing client', () => {
  const store = new ClientStore();
  expect(store.clients.length).toBe(0);
  store.create({
    fullName: 'Jimmy',
    phoneNumber: '1234',
    email: 'immy@gmail.com'
  });
  expect(store.exists({ fullName: 'Jimmy' })).toBe(true);
  expect(store.exists({ fullName: 'Jimm' })).toBe(false);
});
