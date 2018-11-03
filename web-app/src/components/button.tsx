import classNames from 'classnames';
import * as React from 'react';
import './Button.css';

interface IProps {
  className?: string;
  children: React.ReactNode;
}

export const Button = ({
  className,
  children,
  ...rest
}: IProps & React.HTMLProps<HTMLButtonElement>) => (
  <button className={classNames('btn', className)} {...rest}>
    {children}
  </button>
);
