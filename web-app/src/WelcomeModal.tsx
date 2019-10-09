import { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth/lib/types';
import { Auth } from 'aws-amplify';
import classNames from 'classnames';
import { Button } from 'components/Button';
import { Modal, ModalProps } from 'components/Modal';
import { ReactComponent as ExternalIcon } from 'icons/icon-external-window.svg';
import React, { FunctionComponent } from 'react';
import './WelcomeModal.scss';

export const WelcomeModal: FunctionComponent<ModalProps> = ({
  className,
  ...rest
}) => {
  const handleLogin = () => {
    Auth.federatedSignIn({
      provider: CognitoHostedUIIdentityProvider.Facebook
    });
  };

  return (
    <React.Fragment>
      <div className="welcome__overlay" />
      <Modal {...rest} className={classNames('welcome__modal', className)}>
        <div className="welcome__modal__left">
          <h2>Welcome to Salonsy</h2>
          <p>A clever booking application offering:</p>
          <ul>
            <li>Optimized workflow for barbers and salons</li>
            <li>SMS appointment reminders</li>
            <li>Billing based on the number of completed appointments</li>
            <li>
              The first 50 appointments are free and each additional for only
              $0.05
            </li>
          </ul>
        </div>
        <div className="welcome__modal__right">
          <h1>Get Started</h1>
          <p>Start using salonsy immediately</p>
          <Button className="btn__facebook" onClick={handleLogin}>
            Login with Facebook
          </Button>
          <div style={{ display: 'none' }}>
            After login a new admin account will be created and assigned to your
            facebook account. You will use this account for registering your
            staff members and to manage your appointment calendar.
          </div>
          <div className="welcome__learn-more">
            <a href="#void">Learn more about Salonsy</a>
            <ExternalIcon height="16" />
          </div>
        </div>
      </Modal>
    </React.Fragment>
  );
};
