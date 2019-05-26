import classNames from 'classnames';
import React from 'react';
import './ButtonBar.css';

export interface IButtonBarProps {
  className?: string;
  children: React.ReactNode;
}

export interface IButtonBarOptionProps {
  className?: string;
  children: React.ReactNode;
  isSelected?: boolean;
  value: any;
  onClick: (value: any) => void;
}

export class Option extends React.Component<IButtonBarOptionProps, {}> {
  public render() {
    const {
      className,
      children,
      isSelected = false,
      value = '',
      ...rest
    } = this.props;
    return (
      <div
        {...rest}
        className={classNames('btn-bar__option', {
          'btn-bar__option--selected': isSelected
        })}
        data-testid="btn-bar-option"
        data-selected={isSelected}
        data-value={value}
        onClick={this.handleOnClick}
      >
        {children}
      </div>
    );
  }
  private handleOnClick = () => {
    const { onClick = () => {}, value } = this.props;
    onClick(value);
  };
}

export const ButtonBar = ({
  className,
  children,
  ...rest
}: IButtonBarProps) => (
  <div className={classNames('btn-bar', className)} {...rest}>
    {children}
  </div>
);
