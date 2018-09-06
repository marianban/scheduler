import * as React from 'react';
import classNames from 'classnames';

interface IButtonProps {
  className?: string;
}

export const Button = ({ className, ...rest }: IButtonProps) => (
  <button className={classNames('btn', className)} {...rest} />
);
