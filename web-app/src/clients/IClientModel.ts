import { UserRole } from 'API';
import { IClient } from './IClient';

export type IClientModel = IClient & {
  id: string;
  createdAt: string;
  role: UserRole;
  facebookUserId: string | null;
};
