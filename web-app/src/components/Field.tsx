import * as React from 'react';
import { Label } from './Label';
import { ITextBoxProps, TextBox } from './TextBox';

interface IProps {
  title: string;
  name?: string;
}

export const TextField = ({ title, ...rest } : IProps & ITextBoxProps) => {
  return (
    <Label title={title}>
      <TextBox {...rest} />
    </Label>
  );
};
