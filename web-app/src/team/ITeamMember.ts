import { UserRole } from 'API';

export interface ITeamMember {
  fullName: string;
  phoneNumber: string;
  email: string;
  role: UserRole;
}
