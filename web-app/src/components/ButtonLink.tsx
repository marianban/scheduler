import classNames from 'classnames';
import React from 'react';
import './ButtonLink.css';

interface IProps {
  className?: string;
  children: React.ReactNode;
  disabled: boolean;
  onClick: (event: React.SyntheticEvent) => void;
}

export class ButtonLink extends React.Component<
  IProps & React.ButtonHTMLAttributes<HTMLButtonElement>,
  {}
> {
  public static defaultProps = {
    disabled: false
  };

  public render() {
    const { className, children, disabled, ...rest } = this.props;
    return (
      <button
        {...rest}
        className={classNames('btn-link', className, {
          'btn-link--disabled': disabled
        })}
        aria-disabled={disabled}
        onClick={this.handleOnClick}
      >
        {children}
      </button>
    );
  }

  private handleOnClick = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const { onClick, disabled } = this.props;
    if (!disabled) {
      onClick(event);
    }
  };
}
