import React from 'react';
import { Label } from './Label';
import { ITextBoxProps, TextBox } from './TextBox';

export interface ITextFieldProps {
  title: string;
  name?: string;
  value?: string;
}

export const TextField = ({
  title,
  ...rest
}: ITextFieldProps & ITextBoxProps) => {
  return (
    <Label title={title}>
      <TextBox {...rest} />
    </Label>
  );
};
