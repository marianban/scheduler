import * as React from 'react';
import './Popover.css';

interface IPopoverProps {
  trigger: React.ReactChild;
  content: React.ReactChild;
}

export const Popover: React.SFC<IPopoverProps> = ({ content, trigger }) => {
  return (
    <div className="popover__wrapper">
      <div className="popover__trigger">{trigger}</div>
      <div className="popover__content">{content}</div>
    </div>
  );
};
