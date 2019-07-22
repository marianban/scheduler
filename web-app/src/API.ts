/* tslint:disable */
//  This file was automatically generated and should not be edited.

export type CreateUserInput = {
  id?: string | null,
  fullName: string,
  email: string,
  phoneNumber: string,
  createdAt: string,
  role: UserRole,
  owner?: string | null,
  facebookUserId?: string | null,
  userFacilityId?: string | null,
};

export enum UserRole {
  admin = "admin",
  owner = "owner",
  employee = "employee",
  customer = "customer",
}


export type UpdateUserInput = {
  id: string,
  fullName?: string | null,
  email?: string | null,
  phoneNumber?: string | null,
  createdAt?: string | null,
  role?: UserRole | null,
  owner?: string | null,
  facebookUserId?: string | null,
  userFacilityId?: string | null,
};

export type DeleteUserInput = {
  id?: string | null,
};

export type CreateFacilityInput = {
  id?: string | null,
  name: string,
  createdAt: string,
  owner?: string | null,
};

export type UpdateFacilityInput = {
  id: string,
  name?: string | null,
  createdAt?: string | null,
  owner?: string | null,
};

export type DeleteFacilityInput = {
  id?: string | null,
};

export type CreateAppointmentInput = {
  id?: string | null,
  createdAt: string,
  owner?: string | null,
  acceptedBy?: string | null,
  facilityId: string,
  date: string,
  time: string,
  duration: number,
};

export type UpdateAppointmentInput = {
  id: string,
  createdAt?: string | null,
  owner?: string | null,
  acceptedBy?: string | null,
  facilityId?: string | null,
  date?: string | null,
  time?: string | null,
  duration?: number | null,
};

export type DeleteAppointmentInput = {
  id?: string | null,
};

export type ModelUserFilterInput = {
  id?: ModelIDFilterInput | null,
  fullName?: ModelStringFilterInput | null,
  email?: ModelStringFilterInput | null,
  phoneNumber?: ModelStringFilterInput | null,
  createdAt?: ModelStringFilterInput | null,
  role?: ModelUserRoleFilterInput | null,
  owner?: ModelStringFilterInput | null,
  facebookUserId?: ModelStringFilterInput | null,
  and?: Array< ModelUserFilterInput | null > | null,
  or?: Array< ModelUserFilterInput | null > | null,
  not?: ModelUserFilterInput | null,
};

export type ModelIDFilterInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelStringFilterInput = {
  ne?: string | null,
  eq?: string | null,
  le?: string | null,
  lt?: string | null,
  ge?: string | null,
  gt?: string | null,
  contains?: string | null,
  notContains?: string | null,
  between?: Array< string | null > | null,
  beginsWith?: string | null,
};

export type ModelUserRoleFilterInput = {
  eq?: UserRole | null,
  ne?: UserRole | null,
};

export type ModelFacilityFilterInput = {
  id?: ModelIDFilterInput | null,
  name?: ModelStringFilterInput | null,
  createdAt?: ModelStringFilterInput | null,
  owner?: ModelStringFilterInput | null,
  and?: Array< ModelFacilityFilterInput | null > | null,
  or?: Array< ModelFacilityFilterInput | null > | null,
  not?: ModelFacilityFilterInput | null,
};

export type ModelAppointmentFilterInput = {
  id?: ModelIDFilterInput | null,
  createdAt?: ModelStringFilterInput | null,
  owner?: ModelStringFilterInput | null,
  acceptedBy?: ModelStringFilterInput | null,
  facilityId?: ModelIDFilterInput | null,
  date?: ModelStringFilterInput | null,
  time?: ModelStringFilterInput | null,
  duration?: ModelIntFilterInput | null,
  and?: Array< ModelAppointmentFilterInput | null > | null,
  or?: Array< ModelAppointmentFilterInput | null > | null,
  not?: ModelAppointmentFilterInput | null,
};

export type ModelIntFilterInput = {
  ne?: number | null,
  eq?: number | null,
  le?: number | null,
  lt?: number | null,
  ge?: number | null,
  gt?: number | null,
  contains?: number | null,
  notContains?: number | null,
  between?: Array< number | null > | null,
};

export type CreateUserMutationVariables = {
  input: CreateUserInput,
};

export type CreateUserMutation = {
  createUser:  {
    __typename: "User",
    id: string,
    fullName: string,
    email: string,
    phoneNumber: string,
    createdAt: string,
    role: UserRole,
    facility:  {
      __typename: "Facility",
      id: string,
      name: string,
      createdAt: string,
      owner: string | null,
    } | null,
    owner: string | null,
    facebookUserId: string | null,
  } | null,
};

export type UpdateUserMutationVariables = {
  input: UpdateUserInput,
};

export type UpdateUserMutation = {
  updateUser:  {
    __typename: "User",
    id: string,
    fullName: string,
    email: string,
    phoneNumber: string,
    createdAt: string,
    role: UserRole,
    facility:  {
      __typename: "Facility",
      id: string,
      name: string,
      createdAt: string,
      owner: string | null,
    } | null,
    owner: string | null,
    facebookUserId: string | null,
  } | null,
};

export type DeleteUserMutationVariables = {
  input: DeleteUserInput,
};

export type DeleteUserMutation = {
  deleteUser:  {
    __typename: "User",
    id: string,
    fullName: string,
    email: string,
    phoneNumber: string,
    createdAt: string,
    role: UserRole,
    facility:  {
      __typename: "Facility",
      id: string,
      name: string,
      createdAt: string,
      owner: string | null,
    } | null,
    owner: string | null,
    facebookUserId: string | null,
  } | null,
};

export type CreateFacilityMutationVariables = {
  input: CreateFacilityInput,
};

export type CreateFacilityMutation = {
  createFacility:  {
    __typename: "Facility",
    id: string,
    name: string,
    createdAt: string,
    owner: string | null,
  } | null,
};

export type UpdateFacilityMutationVariables = {
  input: UpdateFacilityInput,
};

export type UpdateFacilityMutation = {
  updateFacility:  {
    __typename: "Facility",
    id: string,
    name: string,
    createdAt: string,
    owner: string | null,
  } | null,
};

export type DeleteFacilityMutationVariables = {
  input: DeleteFacilityInput,
};

export type DeleteFacilityMutation = {
  deleteFacility:  {
    __typename: "Facility",
    id: string,
    name: string,
    createdAt: string,
    owner: string | null,
  } | null,
};

export type CreateAppointmentMutationVariables = {
  input: CreateAppointmentInput,
};

export type CreateAppointmentMutation = {
  createAppointment:  {
    __typename: "Appointment",
    id: string,
    createdAt: string,
    owner: string | null,
    acceptedBy: string | null,
    facilityId: string,
    date: string,
    time: string,
    duration: number,
  } | null,
};

export type UpdateAppointmentMutationVariables = {
  input: UpdateAppointmentInput,
};

export type UpdateAppointmentMutation = {
  updateAppointment:  {
    __typename: "Appointment",
    id: string,
    createdAt: string,
    owner: string | null,
    acceptedBy: string | null,
    facilityId: string,
    date: string,
    time: string,
    duration: number,
  } | null,
};

export type DeleteAppointmentMutationVariables = {
  input: DeleteAppointmentInput,
};

export type DeleteAppointmentMutation = {
  deleteAppointment:  {
    __typename: "Appointment",
    id: string,
    createdAt: string,
    owner: string | null,
    acceptedBy: string | null,
    facilityId: string,
    date: string,
    time: string,
    duration: number,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser:  {
    __typename: "User",
    id: string,
    fullName: string,
    email: string,
    phoneNumber: string,
    createdAt: string,
    role: UserRole,
    facility:  {
      __typename: "Facility",
      id: string,
      name: string,
      createdAt: string,
      owner: string | null,
    } | null,
    owner: string | null,
    facebookUserId: string | null,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      id: string,
      fullName: string,
      email: string,
      phoneNumber: string,
      createdAt: string,
      role: UserRole,
      facility:  {
        __typename: "Facility",
        id: string,
        name: string,
        createdAt: string,
        owner: string | null,
      } | null,
      owner: string | null,
      facebookUserId: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetFacilityQueryVariables = {
  id: string,
};

export type GetFacilityQuery = {
  getFacility:  {
    __typename: "Facility",
    id: string,
    name: string,
    createdAt: string,
    owner: string | null,
  } | null,
};

export type ListFacilitysQueryVariables = {
  filter?: ModelFacilityFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListFacilitysQuery = {
  listFacilitys:  {
    __typename: "ModelFacilityConnection",
    items:  Array< {
      __typename: "Facility",
      id: string,
      name: string,
      createdAt: string,
      owner: string | null,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type GetAppointmentQueryVariables = {
  id: string,
};

export type GetAppointmentQuery = {
  getAppointment:  {
    __typename: "Appointment",
    id: string,
    createdAt: string,
    owner: string | null,
    acceptedBy: string | null,
    facilityId: string,
    date: string,
    time: string,
    duration: number,
  } | null,
};

export type ListAppointmentsQueryVariables = {
  filter?: ModelAppointmentFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListAppointmentsQuery = {
  listAppointments:  {
    __typename: "ModelAppointmentConnection",
    items:  Array< {
      __typename: "Appointment",
      id: string,
      createdAt: string,
      owner: string | null,
      acceptedBy: string | null,
      facilityId: string,
      date: string,
      time: string,
      duration: number,
    } | null > | null,
    nextToken: string | null,
  } | null,
};

export type OnCreateUserSubscription = {
  onCreateUser:  {
    __typename: "User",
    id: string,
    fullName: string,
    email: string,
    phoneNumber: string,
    createdAt: string,
    role: UserRole,
    facility:  {
      __typename: "Facility",
      id: string,
      name: string,
      createdAt: string,
      owner: string | null,
    } | null,
    owner: string | null,
    facebookUserId: string | null,
  } | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser:  {
    __typename: "User",
    id: string,
    fullName: string,
    email: string,
    phoneNumber: string,
    createdAt: string,
    role: UserRole,
    facility:  {
      __typename: "Facility",
      id: string,
      name: string,
      createdAt: string,
      owner: string | null,
    } | null,
    owner: string | null,
    facebookUserId: string | null,
  } | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser:  {
    __typename: "User",
    id: string,
    fullName: string,
    email: string,
    phoneNumber: string,
    createdAt: string,
    role: UserRole,
    facility:  {
      __typename: "Facility",
      id: string,
      name: string,
      createdAt: string,
      owner: string | null,
    } | null,
    owner: string | null,
    facebookUserId: string | null,
  } | null,
};

export type OnCreateFacilitySubscription = {
  onCreateFacility:  {
    __typename: "Facility",
    id: string,
    name: string,
    createdAt: string,
    owner: string | null,
  } | null,
};

export type OnUpdateFacilitySubscription = {
  onUpdateFacility:  {
    __typename: "Facility",
    id: string,
    name: string,
    createdAt: string,
    owner: string | null,
  } | null,
};

export type OnDeleteFacilitySubscription = {
  onDeleteFacility:  {
    __typename: "Facility",
    id: string,
    name: string,
    createdAt: string,
    owner: string | null,
  } | null,
};

export type OnCreateAppointmentSubscription = {
  onCreateAppointment:  {
    __typename: "Appointment",
    id: string,
    createdAt: string,
    owner: string | null,
    acceptedBy: string | null,
    facilityId: string,
    date: string,
    time: string,
    duration: number,
  } | null,
};

export type OnUpdateAppointmentSubscription = {
  onUpdateAppointment:  {
    __typename: "Appointment",
    id: string,
    createdAt: string,
    owner: string | null,
    acceptedBy: string | null,
    facilityId: string,
    date: string,
    time: string,
    duration: number,
  } | null,
};

export type OnDeleteAppointmentSubscription = {
  onDeleteAppointment:  {
    __typename: "Appointment",
    id: string,
    createdAt: string,
    owner: string | null,
    acceptedBy: string | null,
    facilityId: string,
    date: string,
    time: string,
    duration: number,
  } | null,
};
