import { Button } from 'components/Button';
import { ButtonLink } from 'components/ButtonLink';
import { TextField } from 'components/TextField';
import { computed, reaction } from 'mobx';
import { inject, observer } from 'mobx-react';
import React from 'react';
import { RootStore } from 'RootStore';
import { ClientModel, IClientValidationResult } from './ClientModel';

interface IState {
  fullName: string;
  email: string;
  phoneNumber: string;
  clientVal: IClientValidationResult;
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
  public readonly state: IState = {
    fullName: '',
    email: '',
    phoneNumber: '',
    clientVal: { isValid: true }
  };

  public componentDidMount() {
    this.ensureClientSelection();
    this.observeClientSelectionChange();
    this.initClientForm();
  }

  public render() {
    const { fullName, email, phoneNumber, clientVal } = this.state;

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
          isValid={!clientVal.fullName}
          message={clientVal.fullName}
          onChange={this.handleOnChange}
          onBlur={this.handleOnBlur}
        />
        <TextField
          title="Email"
          name="email"
          value={email}
          isValid={!clientVal.email}
          message={clientVal.email}
          onChange={this.handleOnChange}
          onBlur={this.handleOnBlur}
        />
        <TextField
          title="Phone Number"
          name="phoneNumber"
          value={phoneNumber}
          isValid={!clientVal.phoneNumber}
          message={clientVal.phoneNumber}
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

  private initClientForm() {
    const { clientSelectionModel } = this.getRootStore();
    if (clientSelectionModel.selectedClient !== null) {
      const { selectedClient } = clientSelectionModel;
      this.setState({
        fullName: selectedClient.fullName,
        phoneNumber: selectedClient.phoneNumber,
        email: selectedClient.email
      });
    }
  }

  @computed
  private get isNewClient() {
    const { clientSelectionModel } = this.getRootStore();
    return clientSelectionModel.selectedClient === null;
  }

  private handleOnDeleteClient = () => {
    const { clientStore, clientSelectionModel } = this.getRootStore();
    clientStore.deleteById(clientSelectionModel.selectedClient!.id);
    this.setState({
      clientVal: { isValid: true }
    });
  };

  private ensureClientSelection() {
    const { clientSelectionModel, clientStore } = this.getRootStore();
    reaction(
      () => clientStore.clients.length,
      (clientsLength: number, r) => {
        if (clientsLength > 0 && clientSelectionModel.selectedClient === null) {
          clientSelectionModel.select(clientStore.clients[0]);
          r.dispose();
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
    this.setState({
      clientVal: { isValid: true }
    });
  };

  private handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState(
      {
        [event.target.name]: event.target.value
      } as Pick<IState, Exclude<keyof IState, 'clientVal'>>,
      () => {
        const { clientVal } = this.state;
        if (!clientVal.isValid) {
          this.setState({
            clientVal: ClientModel.validate(this.state)
          });
        }
      }
    );
  };

  private handleOnBlur = () => {
    const { clientSelectionModel, clientStore } = this.getRootStore();
    const { selectedClient } = clientSelectionModel;
    const clientVal = ClientModel.validate(this.state);
    this.setState({
      clientVal
    });
    if (clientVal.isValid) {
      if (selectedClient !== null) {
        clientStore.update(selectedClient, this.state);
      } else {
        const client = clientStore.create(this.state);
        clientSelectionModel.select(client);
      }
    }
  };

  private getRootStore = () => {
    return this.props.rootStore!;
  };
}
