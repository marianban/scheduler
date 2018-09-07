import classNames from 'classnames';
import * as React from 'react';
import './button.css';

interface IButtonProps {
  className?: string;
  children: React.ReactNode;
}

export const Button = ({ className, children, ...rest }: IButtonProps) => (
  <button className={classNames('btn', className)} {...rest}>{children}</button>
);
