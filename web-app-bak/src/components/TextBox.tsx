import classNames from 'classnames';
import React from 'react';
import './TextBox.css';

export interface ITextBoxProps extends React.HTMLProps<HTMLInputElement> {
  suffix?: React.ReactNode;
}

export class TextBox extends React.Component<ITextBoxProps, {}> {
  public render() {
    const { className, suffix, ...rest } = this.props;
    return (
      <div className={classNames('text-box__container', className)}>
        <input
          {...rest}
          type="text"
          className="text-box"
          onChange={this.handleOnChange}
          onBlur={this.handleOnBlur}
        />
        {suffix && <div className="text-box__suffix">{suffix}</div>}
      </div>
    );
  }

  public handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(event);
    }
  };

  public handleOnBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { onBlur } = this.props;
    if (onBlur) {
      onBlur(event);
    }
  };
}
