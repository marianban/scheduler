import React, { useState } from "react";
import { FieldContainer, IFieldContainerProps } from "./FieldContainer";
import { Label } from "./Label";
import { ITextBoxProps, TextBox } from "./TextBox";

export const TextField = ({
  title,
  isValid = true,
  message,
  // onBlur,
  ...rest
}: ITextBoxProps & IFieldContainerProps) => {
  // const [blurred, setBlurred] = useState(false);
  const valid = isValid;
  return (
    <Label title={title!}>
      <FieldContainer isValid={valid} message={message}>
        {/* TODO: Find out why we need any */}
        <TextBox {...rest as any} data-valid={valid} />
      </FieldContainer>
    </Label>
  );

  /*
  function handleOnBlur(event: React.FocusEvent<HTMLInputElement>) {
    if (onBlur) {
      onBlur(event);
    }
    setBlurred(true);
  }
  */
};
