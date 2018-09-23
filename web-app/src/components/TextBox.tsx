import classNames from 'classnames';
import * as React from 'react';
import './TextBox.css'

interface IProps {
  className?: string;
}

export const TextBox = ({ className, ...rest }: IProps) => (
  <input type="text" className={classNames('text-box', className)} {...rest} />
);
