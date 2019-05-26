import React from "react";
import { RootStore } from "RootStore";
import { Clients } from "test/data";
import { renderWithProviders } from "test/utils";
import { ClientRightPane } from "./ClientRightPane";
import { IClient } from "./IClient";

const renderRightPane = (rootStore?: RootStore) => {
  const result = renderWithProviders(<ClientRightPane />, rootStore);
  const { getByLabelText, getByTestId } = result;
  return {
    ...result,
    fullName: getByLabelText(/Full Name/i) as HTMLInputElement,
    email: getByLabelText(/Email/i) as HTMLInputElement,
    phoneNumber: getByLabelText(/Phone Number/i) as HTMLInputElement,
    newClientBtn: getByTestId("new-client-btn"),
    deleteClientBtn: getByTestId("delete-client")
  };
};

export const expectClient = (
  {
    fullName,
    email,
    phoneNumber
  }: {
    fullName: HTMLInputElement;
    email: HTMLInputElement;
    phoneNumber: HTMLInputElement;
  },
  client: IClient
) => {
  expect(fullName.value).toBe(client.fullName);
  expect(email.value).toBe(client.email);
  expect(phoneNumber.value).toBe(client.phoneNumber);
};

it("renders selected client", () => {
  const rootStore = new RootStore(new Date());
  const { clientSelectionModel, clientStore } = rootStore;
  expect(clientSelectionModel.selectedClient).toBeNull();
  expect(clientStore.clients).toBeEmpty();
  const leo = clientStore.create(Clients.Leonard);
  clientSelectionModel.select(leo);
  const result = renderRightPane(rootStore);
  clientStore.create(Clients.Martin);
  expect(clientStore.clients).toHaveLength(2);
  expect(clientSelectionModel.selectedClient).not.toBeNull();
  expectClient(result, Clients.Leonard);
});

it("can update selected client", () => {
  const result = renderRightPane();
  const { rootStore, fullName, email, phoneNumber, type } = result;
  const { clientStore } = rootStore;
  clientStore.create(Clients.Leonard);
  expectClient(result, Clients.Leonard);
  type(fullName, Clients.Martin.fullName);
  type(email, Clients.Martin.email);
  type(phoneNumber, Clients.Martin.phoneNumber);
  expectClient(result, Clients.Martin);
  const client = clientStore.getByFullName(Clients.Martin.fullName);
  expect(client.email).toBe(Clients.Martin.email);
  expect(client.phoneNumber).toBe(Clients.Martin.phoneNumber);
});

it("can create new client", () => {
  const result = renderRightPane();
  const {
    rootStore,
    newClientBtn,
    fireEvent,
    fullName,
    email,
    phoneNumber,
    type
  } = result;
  const { clientStore } = rootStore;
  expect(newClientBtn).toBeDisabled();
  clientStore.create(Clients.Leonard);
  expect(clientStore.clients).toHaveLength(1);
  expect(newClientBtn).not.toBeDisabled();
  expectClient(result, Clients.Leonard);
  fireEvent.click(newClientBtn);
  expect(newClientBtn).toBeDisabled();
  expectClient(result, Clients.Empty);
  type(fullName, Clients.Martin.fullName);
  type(email, Clients.Martin.email);
  type(phoneNumber, Clients.Martin.phoneNumber);
  expect(clientStore.clients).toHaveLength(2);
  expect(newClientBtn).not.toBeDisabled();
});

it("can delete client", () => {
  const result = renderRightPane();
  const { rootStore, deleteClientBtn, newClientBtn, fireEvent } = result;
  const { clientStore, appointmentsModel, clientSelectionModel } = rootStore;
  expect(deleteClientBtn).toBeDisabled();
  expect(newClientBtn).toBeDisabled();
  const client = clientStore.create(Clients.Leonard);
  appointmentsModel.create({
    date: "20/10/2018",
    time: "13:30",
    duration: 30,
    clientId: client.id
  });
  appointmentsModel.create({
    date: "21/10/2018",
    time: "13:30",
    duration: 30,
    clientId: client.id
  });
  expect(clientStore.clients).toHaveLength(1);
  expect(appointmentsModel.appointments).toHaveLength(2);
  expect(deleteClientBtn).not.toBeDisabled();
  expect(newClientBtn).not.toBeDisabled();
  fireEvent.click(deleteClientBtn);
  expect(clientStore.clients).toHaveLength(0);
  expect(appointmentsModel.appointments).toHaveLength(0);
  expect(deleteClientBtn).toBeDisabled();
  expect(clientSelectionModel.selectedClient).toBeNull();
});

it("selects next client if the currently selected is deleted", () => {
  const result = renderRightPane();
  const { rootStore, deleteClientBtn, fireEvent } = result;
  const { clientStore, clientSelectionModel } = rootStore;
  clientStore.create(Clients.Leonard);
  const martin = clientStore.create(Clients.Martin);
  clientSelectionModel.select(martin);
  fireEvent.click(deleteClientBtn);
  expect(clientSelectionModel.selectedClient).not.toBeNull();
  expect(clientSelectionModel.selectedClient!.fullName).toBe(
    Clients.Leonard.fullName
  );
  expectClient(result, Clients.Leonard);
});
