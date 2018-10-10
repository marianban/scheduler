import classNames from 'classnames';
import * as React from 'react';
import './ButtonLink.css';

interface IProps {
  className?: string;
  children: React.ReactNode;
}

export class ButtonLink extends React.Component<IProps, {}> {
  public render() {
    const { className, children, ...rest } = this.props;
    return (
      <a
        href=""
        role="button"
        className={classNames('btn-link', className)}
        {...rest}
      >
        {children}
      </a>
    );
  }
}
