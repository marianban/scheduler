import { TextField } from "components/TextField";
import React, { useState } from "react";
import { fireEvent, render } from "react-testing-library";
import { field, IValidationResult } from "./field";

describe("field test", () => {
  it("should validate input on blur", () => {
    const { getByLabelText, getByRole, container } = render(<Form />);
    const input = getByLabelText("Full Name") as HTMLInputElement;

    fireEvent.blur(input);
    const alert = getByRole("alert") as HTMLDivElement;
    expect(alert.textContent).toInclude("required");

    fireEvent.change(input, { target: { value: "name" } });

    fireEvent.blur(input);
    expect(container.textContent).not.toInclude("required");

    function Form() {
      const [fullName, setFullName] = useState("");
      const [isValid, setIsValid] = useState(true);
      const [message, setMessage] = useState("");

      const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setFullName(e.target.value);
      const handleOnValidated = (results: IValidationResult[]) => {
        if (results.length) {
          const [result] = results;
          setIsValid(result.isValid);
          setMessage(result.message);
        }
      };

      return (
        <div>
          <TextField
            title="Full Name"
            value={fullName}
            onChange={handleOnChange}
            isValid={isValid}
            message={message}
            {...field(v => ({
              validators: [v.isRequired("Full Name is required")],
              onValidated: handleOnValidated
            }))}
          />
        </div>
      );
    }
  });
});
