import { ButtonLink } from 'components/ButtonLink';
import { TextField } from 'components/TextField';
import { computed, reaction } from 'mobx';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { RootStore } from 'RootStore';

interface IState {
  fullName: string;
  email: string;
  phoneNumber: string;
}

interface IClientRightPaneProps {
  rootStore?: RootStore;
}

@inject('rootStore')
@observer
export class ClientRightPane extends React.Component<
  IClientRightPaneProps,
  IState
> {
  public readonly state: IState = { fullName: '', email: '', phoneNumber: '' };

  public componentDidMount() {
    const { clientSelectionModel, clientStore } = this.getRootStore();

    reaction(
      () => clientStore.clients.length,
      (clientsLength: number) => {
        if (clientsLength > 0 && clientSelectionModel.selectedClient === null) {
          clientSelectionModel.select(clientStore.clients[0]);
        }
      },
      { fireImmediately: true }
    );

    computed(() => clientSelectionModel.selectedClient).observe(
      ({ oldValue, newValue }) => {
        if (
          newValue !== null &&
          (oldValue === null ||
            oldValue === undefined ||
            oldValue.id !== newValue.id)
        ) {
          this.setState({
            fullName: newValue.fullName,
            email: newValue.email,
            phoneNumber: newValue.phoneNumber
          });
        }
      }
    );
  }

  public render() {
    const { fullName, email, phoneNumber } = this.state;

    return (
      <aside className="app__right-pane">
        <div className="grid-col-2">
          <h2 className="app__right-pane__h">Client</h2>
          <ButtonLink
            className="h__btn-link app__right-pane__h"
            onClick={this.handleOnNewClientClick}
            data-testid="new-appointment"
            disabled={false}
          >
            new
          </ButtonLink>
        </div>
        <TextField
          title="Full Name"
          name="fullName"
          value={fullName}
          onChange={this.handleOnChange}
          onBlur={this.handleOnBlur}
        />
        <TextField
          title="Email"
          name="email"
          value={email}
          onChange={this.handleOnChange}
          onBlur={this.handleOnBlur}
        />
        <TextField
          title="Phone Number"
          name="phoneNumber"
          value={phoneNumber}
          onChange={this.handleOnChange}
          onBlur={this.handleOnBlur}
        />
      </aside>
    );
  }

  private handleOnNewClientClick = () => {
    console.log('handleOnNewClientClick');
  };

  private handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      [event.target.name]: event.target.value
    } as Pick<IState, keyof IState>);
  };

  private handleOnBlur = () => {};

  private getRootStore = () => {
    return this.props.rootStore!;
  };
}
