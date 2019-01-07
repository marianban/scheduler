import React from 'react';
import { Label } from './Label';
import { ITextBoxProps, TextBox } from './TextBox';

export const TextField = ({ title, ...rest }: ITextBoxProps) => {
  return (
    <Label title={title!}>
      {/* TODO: Find out why we need any */}
      <TextBox {...rest as any} />
    </Label>
  );
};
