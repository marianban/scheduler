import { Provider } from "mobx-react";
import React from "react";
import { fireEvent, render } from "react-testing-library";
import { RootStore } from "RootStore";

export const renderWithProviders = (
  ui: React.ReactElement<any>,
  rootStore = new RootStore(new Date())
) => {
  return {
    ...render(<Provider rootStore={rootStore}>{ui}</Provider>),
    type: (element: HTMLElement, value: string) => {
      fireEvent.change(element, { target: { value } });
      fireEvent.blur(element);
    },
    change: (element: HTMLElement, value: string) => {
      fireEvent.change(element, { target: { value } });
    },
    isValid: (element: HTMLInputElement) => {
      return element.getAttribute("data-valid") === "true";
    },
    fireEvent,
    rootStore
  };
};
