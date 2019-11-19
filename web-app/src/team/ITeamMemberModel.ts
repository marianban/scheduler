import { UserRole } from 'API';
import { ITeamMember } from './ITeamMember';

export type ITeamMemberModel = ITeamMember & {
  id: string;
  createdAt: string;
  role: UserRole;
  facebookUserId: string | null;
};
