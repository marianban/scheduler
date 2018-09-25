import classNames from 'classnames';
import * as React from 'react';
import './TextBox.css';

export interface ITextBoxProps {
  className?: string;
  suffix?: React.ReactNode;
}

export const TextBox = ({ className, suffix, ...rest }: ITextBoxProps) => ( 
  <div className="text-box__container"> 
    <input
      type="text"
      className={classNames('text-box', className)}
      {...rest}
    />
    { suffix && <div className="text-box__suffix">{suffix}</div> }
  </div>
);
