import classNames from 'classnames';
import React, { FunctionComponent } from 'react';
import './Modal.css';

export type ModalProps = React.HTMLAttributes<HTMLDivElement>;

export const Modal: FunctionComponent<ModalProps> = ({
  children,
  className
}) => <div className={classNames('modal', className)}>{children}</div>;

/*
// Is this needed in some cases actually?

import { FunctionComponent, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

const modalRoot = document.getElementById('modal-root')!;

export const Modal: FunctionComponent = ({ children }) => {
  const elementRef = useRef(document.createElement('div'));

  useEffect(() => {
    modalRoot.appendChild(elementRef.current);
    return () => {
      elementRef.current.remove();
    };
  }, []);

  return createPortal(children, elementRef.current);
};
*/
