// tslint:disable
// this is an auto generated file. This will be overwritten

export const createUser = `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    id
    fullName
    email
    phoneNumber
    createdAt
    role
    facility {
      id
      name
      createdAt
      owner
    }
    owner
    facebookUserId
  }
}
`;
export const updateUser = `mutation UpdateUser($input: UpdateUserInput!) {
  updateUser(input: $input) {
    id
    fullName
    email
    phoneNumber
    createdAt
    role
    facility {
      id
      name
      createdAt
      owner
    }
    owner
    facebookUserId
  }
}
`;
export const deleteUser = `mutation DeleteUser($input: DeleteUserInput!) {
  deleteUser(input: $input) {
    id
    fullName
    email
    phoneNumber
    createdAt
    role
    facility {
      id
      name
      createdAt
      owner
    }
    owner
    facebookUserId
  }
}
`;
export const createFacility = `mutation CreateFacility($input: CreateFacilityInput!) {
  createFacility(input: $input) {
    id
    name
    createdAt
    owner
  }
}
`;
export const updateFacility = `mutation UpdateFacility($input: UpdateFacilityInput!) {
  updateFacility(input: $input) {
    id
    name
    createdAt
    owner
  }
}
`;
export const deleteFacility = `mutation DeleteFacility($input: DeleteFacilityInput!) {
  deleteFacility(input: $input) {
    id
    name
    createdAt
    owner
  }
}
`;
export const createAppointment = `mutation CreateAppointment($input: CreateAppointmentInput!) {
  createAppointment(input: $input) {
    id
    createdAt
    owner
    acceptedBy
    facilityId
    date
    time
    duration
  }
}
`;
export const updateAppointment = `mutation UpdateAppointment($input: UpdateAppointmentInput!) {
  updateAppointment(input: $input) {
    id
    createdAt
    owner
    acceptedBy
    facilityId
    date
    time
    duration
  }
}
`;
export const deleteAppointment = `mutation DeleteAppointment($input: DeleteAppointmentInput!) {
  deleteAppointment(input: $input) {
    id
    createdAt
    owner
    acceptedBy
    facilityId
    date
    time
    duration
  }
}
`;
