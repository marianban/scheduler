import * as React from 'react';
import { ButtonBar, IButtonBarProps } from './ButtonBar';
import { Label } from './Label';

export interface IButtonBarFieldProps {
  title: string;
}

export { Option } from './ButtonBar';

export const ButtonBarField = ({
  title,
  ...rest
}: IButtonBarFieldProps & IButtonBarProps) => {
  return (
    <Label title={title}>
      <ButtonBar {...rest} />
    </Label>
  );
};
