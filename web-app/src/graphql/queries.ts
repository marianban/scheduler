// tslint:disable
// this is an auto generated file. This will be overwritten

export const getUser = `query GetUser($id: ID!) {
  getUser(id: $id) {
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
    }
    facebookUserId
  }
}
`;
export const listUsers = `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
      }
      facebookUserId
    }
    nextToken
  }
}
`;
export const getFacility = `query GetFacility($id: ID!) {
  getFacility(id: $id) {
    id
    name
    createdAt
  }
}
`;
export const listFacilitys = `query ListFacilitys(
  $filter: ModelFacilityFilterInput
  $limit: Int
  $nextToken: String
) {
  listFacilitys(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      name
      createdAt
    }
    nextToken
  }
}
`;
export const getAppointment = `query GetAppointment($id: ID!) {
  getAppointment(id: $id) {
    id
    createdAt
    owner
    clientId
    acceptedBy
    facilityId
    dateTime
    duration
  }
}
`;
export const listAppointments = `query ListAppointments(
  $filter: ModelAppointmentFilterInput
  $limit: Int
  $nextToken: String
) {
  listAppointments(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      id
      createdAt
      owner
      clientId
      acceptedBy
      facilityId
      dateTime
      duration
    }
    nextToken
  }
}
`;
