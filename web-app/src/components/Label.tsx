import classNames from 'classnames';
import * as React from 'react';
import './Label.css';

export interface IProps {
  className?: string;
  children: React.ReactNode;
  title: string;
}

export const Label = ({ className, children, title, ...rest }: IProps) => (
  <label className={classNames('label', className)} {...rest}>
    <span className="label__title">{title}</span>
    {children}
  </label>
);
