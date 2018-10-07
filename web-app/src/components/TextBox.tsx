import classNames from 'classnames';
import * as React from 'react';
import './TextBox.css';

export interface ITextBoxProps {
  className?: string;
  suffix?: React.ReactNode;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.SyntheticEvent) => void;
}

export class TextBox extends React.Component<ITextBoxProps, {}> {
  constructor(props: ITextBoxProps) {
    super(props);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  public render() {
    const { className, suffix, ...rest } = this.props;
    return (
      <div className="text-box__container">
        <input
          {...rest}
          type="text"
          className={classNames('text-box', className)}
          onChange={this.handleOnChange}
          onBlur={this.handleOnBlur}
        />
        {suffix && <div className="text-box__suffix">{suffix}</div>}
      </div>
    );
  }

  public handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { onChange } = this.props;
    if (onChange) {
      onChange(event);
    }
  }

  public handleOnBlur(event: React.SyntheticEvent) {
    const { onBlur } = this.props;
    if (onBlur) {
      onBlur(event);
    }
  }
}
