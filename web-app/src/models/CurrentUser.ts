import { UserRole } from 'API';

export type CurrentUser = {
  id: string;
  fullName: string;
  email: string;
  phoneNumber?: string;
  createdAt: string;
  role: UserRole;
  facebookUserId: string | null;
};
