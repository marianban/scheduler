import { IItem } from "components/TypeaheadField";
import { action, observable } from "mobx";
import { v4 } from "uuid";
import { IClient } from "./IClient";

export interface IValidationResult {
  isValid: boolean;
}

export type IClientValidationResult = IValidationResult & Partial<IClient>;

export class ClientModel implements IClient, IItem {
  public static validate(client: IClient): IClientValidationResult {
    const result: IClientValidationResult = { isValid: true };
    if (!client.fullName) {
      result.fullName = "Required";
      result.isValid = false;
    }
    if (client.email) {
      const regex = new RegExp(
        /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
      );
      if (!regex.test(client.email)) {
        result.email = "Invalid format";
        result.isValid = false;
      }
    }
    return result;
  }

  @observable
  public id!: string;
  @observable
  public fullName!: string;
  @observable
  public phoneNumber!: string;
  @observable
  public email!: string;

  constructor(
    fullName: string,
    phoneNumber: string,
    email: string,
    id: string = v4()
  ) {
    this.init(fullName, phoneNumber, email, id);
  }

  public get value(): string {
    return this.fullName;
  }

  @action
  public update({
    fullName,
    phoneNumber,
    email
  }: {
    fullName?: string;
    phoneNumber?: string;
    email?: string;
  }) {
    if (fullName || fullName === "") {
      this.fullName = fullName;
    }
    if (phoneNumber || phoneNumber === "") {
      this.phoneNumber = phoneNumber;
    }
    if (email || email === "") {
      this.email = email;
    }
  }

  public equals(client: IClient) {
    return this.fullName === client.fullName;
  }

  @action
  private init(
    fullName: string,
    phoneNumber: string,
    email: string,
    id: string
  ) {
    this.fullName = fullName;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.id = id;
  }
}
