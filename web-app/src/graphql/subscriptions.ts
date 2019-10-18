// tslint:disable
// this is an auto generated file. This will be overwritten

export const onCreateUser = `subscription OnCreateUser {
  onCreateUser {
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
export const onUpdateUser = `subscription OnUpdateUser {
  onUpdateUser {
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
export const onDeleteUser = `subscription OnDeleteUser {
  onDeleteUser {
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
export const onCreateFacility = `subscription OnCreateFacility {
  onCreateFacility {
    id
    name
    createdAt
  }
}
`;
export const onUpdateFacility = `subscription OnUpdateFacility {
  onUpdateFacility {
    id
    name
    createdAt
  }
}
`;
export const onDeleteFacility = `subscription OnDeleteFacility {
  onDeleteFacility {
    id
    name
    createdAt
  }
}
`;
export const onCreateAppointment = `subscription OnCreateAppointment {
  onCreateAppointment {
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
export const onUpdateAppointment = `subscription OnUpdateAppointment {
  onUpdateAppointment {
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
export const onDeleteAppointment = `subscription OnDeleteAppointment {
  onDeleteAppointment {
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
