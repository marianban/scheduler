import { rightPane } from "calendar/right-pane/RightPane.test";
import format from "date-fns/format";
import React from "react";
import { renderWithProviders } from "test/utils";
import { CalendarPage } from "./CalendarPage";

it("clears right page if appointment is deleted", () => {
  const result = renderWithProviders(<CalendarPage />);
  const { fullName } = rightPane(result);
  const { fireEvent, getByTestId, type } = result;
  const calendarItem = getByTestId(format(new Date(), "d/M/yyyy 10:00"));
  fireEvent.click(
    calendarItem.querySelector('[data-testid="calendar-create-appointment"]')!
  );
  type(fullName, "Leo");
  const removeAppointment = getByTestId("popover-menu-item-remove");
  fireEvent.click(removeAppointment);
  expect(fullName.value).toBeEmpty();
});
