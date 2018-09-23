import * as React from 'react';
import { Label } from './Label';
import { TextBox } from './TextBox';

interface IProps {
  title: string;
  type: FieldType;
}

export enum FieldType {
  Text = 'Text'
}

const getComponent = (type: FieldType) => {
  switch (type) {
    case FieldType.Text:
      return TextBox;
    default:
      throw new Error(`Invalid field type: ${type}`);
  }
};

export const Field = ({ title, type, ...rest }: IProps) => {
  const Component = getComponent(type);
  return (
    <Label title={title}>
      <Component />
    </Label>
  );
};
