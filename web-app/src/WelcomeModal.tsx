import classNames from 'classnames';
import { Modal, ModalProps } from 'components/Modal';
import React, { FunctionComponent } from 'react';
import './WelcomeModal.scss';

export const WelcomeModal: FunctionComponent<ModalProps> = ({
  className,
  ...rest
}) => (
  <Modal {...rest} className={classNames('welcome-modal', className)}>
    <div className="welcome-modal__left">
      <h1>Welcome to Salonsy</h1>
      <p>A clever booking application offering:</p>
      <ul>
        <li>
          Easy online booking for your clients
        </li>
        <li>SMS appointment reminders</li>
        <li>Billing based on the number of completed appointments</li>
        <li>First 70 booked appointments for free</li>
      </ul>
    </div>
    <div className="welcome-modal__right">Start using Salonsy now</div>
  </Modal>
);
