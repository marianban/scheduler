import { Button } from 'components/Button';
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
    this.ensureClientSelection();
    this.observeClientSelectionChange();
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
            data-testid="new-client-btn"
            disabled={this.isNewClient}
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
        <div className="pane__bottom">
          <Button
            className="btn--secondary"
            data-testid="delete-client"
            disabled={this.isNewClient}
            onClick={this.handleOnDeleteClient}
          >
            Delete Client
          </Button>
        </div>
      </aside>
    );
  }

  @computed
  private get isNewClient() {
    const { clientSelectionModel } = this.getRootStore();
    return clientSelectionModel.selectedClient === null;
  }

  private handleOnDeleteClient = () => {
    const { clientStore, clientSelectionModel } = this.getRootStore();
    clientStore.deleteById(clientSelectionModel.selectedClient!.id);
  };

  private ensureClientSelection() {
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
  }

  private observeClientSelectionChange() {
    const { clientSelectionModel } = this.getRootStore();
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
        if (newValue === null) {
          this.setState({
            fullName: '',
            email: '',
            phoneNumber: ''
          });
        }
      }
    );
  }

  private handleOnNewClientClick = () => {
    const { clientSelectionModel } = this.getRootStore();
    clientSelectionModel.unselect();
  };

  private handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      [event.target.name]: event.target.value
    } as Pick<IState, keyof IState>);
  };

  private handleOnBlur = () => {
    const { fullName } = this.state;
    const { clientSelectionModel, clientStore } = this.getRootStore();
    const { selectedClient } = clientSelectionModel;
    if (fullName) {
      if (selectedClient !== null) {
        selectedClient.update(this.state);
      } else {
        clientStore.create(this.state);
      }
    }
  };

  private getRootStore = () => {
    return this.props.rootStore!;
  };
}
