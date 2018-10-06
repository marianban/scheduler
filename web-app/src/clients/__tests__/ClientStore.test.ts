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
  const client = new ClientModel('Jimmy', '1234', 'jimmy@gmail.com');
  store.create(client);
  expect(() => { store.create(client); }).toThrowErrorMatchingSnapshot();
});

it('updates client if already exists', () => {
  const store = new ClientStore();
  const client = new ClientModel('Jimmy', '1234', 'jimmy@gmail.com');
  store.create(client);
  client.update({ phoneNumber: '3451' });
  expect(store.clients.length).toBe(1);
  expect(store.clients[0].phoneNumber).toBe('3451');
});

it('can set field to empty string', () => {
  const store = new ClientStore();
  const client = new ClientModel('Jimmy', '1234', 'jimmy@gmail.com');
  store.create(client);
  client.update({ phoneNumber: '' });
  expect(store.clients.length).toBe(1);
  expect(store.clients[0].phoneNumber).toBe('');
});

it("can delete client", () => {
  const store = new ClientStore();
  expect(store.clients.length).toBe(0);
  const client = new ClientModel('Jimmy', '1234', 'jimmy@gmail.com');
  store.create(client);
  store.deleteById(client.id);
  expect(store.clients.length).toBe(0);
});
