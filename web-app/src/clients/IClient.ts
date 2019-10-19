import { UserRole } from 'API';

export interface IClient {
  fullName: string;
  phoneNumber: string;
  email: string;
  role: UserRole;
}
