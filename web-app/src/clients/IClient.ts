import { UserRole } from 'API';

export interface IClient {
  fullName: string;
  phoneNumber: string;
  email: string;
  // TODO: remove role from client
  role: UserRole;
}
