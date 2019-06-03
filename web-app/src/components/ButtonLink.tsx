import classNames from 'classnames';
import React from 'react';
import './ButtonLink.css';

interface IProps {
  className?: string;
  children: React.ReactNode;
  disabled: boolean;
  onClick: (event: React.SyntheticEvent) => void;
}

export class ButtonLink extends React.Component<IProps, {}> {
  public static defaultProps = {
    disabled: false
  };

  public render() {
    const { className, children, disabled, ...rest } = this.props;
    return (
      <a
        {...rest}
        href="#"
        role="button"
        className={classNames(className, {
          'btn-link--disabled': disabled
        })}
        aria-disabled={disabled}
        onClick={this.handleOnClick}
      >
        {children}
      </a>
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
