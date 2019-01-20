import React from "react";
import { renderWithProviders } from "test/utils";
import { ClientsPage } from "./ClientsPage";
import { IClient } from "./IClient";

const renderClientsPage = () => {
  const result = renderWithProviders(<ClientsPage />);
  const { getByLabelText, getByTestId, getAllByTestId } = result;
  return {
    ...result,
    fullName: getByLabelText(/Full Name/i) as HTMLInputElement,
    email: getByLabelText(/Email/i) as HTMLInputElement,
    phoneNumber: getByLabelText(/Phone Number/i) as HTMLInputElement,
    newClientBtn: getByTestId("new-client-btn"),
    deleteClientBtn: getByTestId("delete-client"),
    includesClient: (client: IClient) => {
      const clientList = getByTestId("list-view");
      const includes =
        clientList.innerHTML.includes(client.fullName) &&
        clientList.innerHTML.includes(client.email) &&
        clientList.innerHTML.includes(client.phoneNumber);
      return includes;
    },
    clientsCount: () => {
      const clientLists = getByTestId("list-view");
      return clientLists.querySelectorAll(".list-view__item").length;
    }
  };
};

it("can't create invalid client", () => {
  const {
    email,
    fullName,
    phoneNumber,
    fireEvent,
    isValid,
    clientsCount,
    type,
    change
  } = renderClientsPage();
  fireEvent.blur(fullName);
  expect(clientsCount()).toBe(0);
  expect(isValid(fullName)).toBe(false);
  expect(isValid(email)).toBe(true);
  expect(isValid(phoneNumber)).toBe(true);
  type(fullName, "Marian");
  expect(isValid(fullName)).toBe(true);
  type(fullName, "");
  expect(isValid(fullName)).toBe(false);
  change(fullName, "Leo");
  expect(isValid(fullName)).toBe(true);
});

it("clear's validation if new client is created", () => {
  const {
    email,
    fullName,
    fireEvent,
    isValid,
    newClientBtn,
    type
  } = renderClientsPage();
  type(fullName, "Leo");
  type(email, "leo");
  expect(isValid(email)).toBe(false);
  fireEvent.click(newClientBtn);
  expect(isValid(email)).toBe(true);
});

it("clear's validation if client is deleted", () => {
  const {
    email,
    fullName,
    fireEvent,
    isValid,
    clientsCount,
    deleteClientBtn,
    type
  } = renderClientsPage();
  type(fullName, "Leo");
  type(email, "leo");
  expect(isValid(email)).toBe(false);
  expect(clientsCount()).toBe(1);
  fireEvent.click(deleteClientBtn);
  expect(clientsCount()).toBe(0);
  expect(isValid(email)).toBe(true);
});
