import React from "react";
import { FieldContainer, IFieldContainerProps } from "./FieldContainer";
import { Label } from "./Label";
import { ITextBoxProps, TextBox } from "./TextBox";

export const TextField = ({
  title,
  isValid,
  message,
  ...rest
}: ITextBoxProps & IFieldContainerProps) => {
  return (
    <Label title={title!}>
      <FieldContainer isValid={isValid} message={message}>
        {/* TODO: Find out why we need any */}
        <TextBox {...rest as any} />
      </FieldContainer>
    </Label>
  );
};
