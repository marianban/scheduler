// tslint:disable
// this is an auto generated file. This will be overwritten

export const onCreateUser = `subscription OnCreateUser {
  onCreateUser {
    id
    username
    email
    phone
    createdAt
    role
    facility {
      id
      name
      createdAt
      owner
    }
    owner
  }
}
`;
export const onUpdateUser = `subscription OnUpdateUser {
  onUpdateUser {
    id
    username
    email
    phone
    createdAt
    role
    facility {
      id
      name
      createdAt
      owner
    }
    owner
  }
}
`;
export const onDeleteUser = `subscription OnDeleteUser {
  onDeleteUser {
    id
    username
    email
    phone
    createdAt
    role
    facility {
      id
      name
      createdAt
      owner
    }
    owner
  }
}
`;
export const onCreateFacility = `subscription OnCreateFacility {
  onCreateFacility {
    id
    name
    createdAt
    owner
  }
}
`;
export const onUpdateFacility = `subscription OnUpdateFacility {
  onUpdateFacility {
    id
    name
    createdAt
    owner
  }
}
`;
export const onDeleteFacility = `subscription OnDeleteFacility {
  onDeleteFacility {
    id
    name
    createdAt
    owner
  }
}
`;
export const onCreateAppointment = `subscription OnCreateAppointment {
  onCreateAppointment {
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
export const onUpdateAppointment = `subscription OnUpdateAppointment {
  onUpdateAppointment {
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
export const onDeleteAppointment = `subscription OnDeleteAppointment {
  onDeleteAppointment {
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
