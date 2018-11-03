import classNames from 'classnames';
import * as React from 'react';
import './ButtonBar.css';

export interface IButtonBarProps {
  className?: string;
  children: React.ReactNode;
}

export interface IButtonBarOptionProps {
  className?: string;
  children: React.ReactNode;
  isSelected?: boolean;
}

export const Option = ({
  className,
  children,
  isSelected = false,
  ...rest
}: IButtonBarOptionProps) => (
  <div
    className={classNames('btn-bar__option', {
      'btn-bar__option--selected': isSelected
    })}
    data-testid="btn-bar-option"
    data-selected={isSelected}
  >
    {children}
  </div>
);

export const ButtonBar = ({
  className,
  children,
  ...rest
}: IButtonBarProps) => (
  <div className={classNames('btn-bar', className)} {...rest}>
    {children}
  </div>
);
