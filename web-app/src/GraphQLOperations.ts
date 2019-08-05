import { GraphQLResult } from '@aws-amplify/api/lib/types';
import { API, graphqlOperation } from 'aws-amplify';
import {
  CreateAppointmentInput,
  CreateUserInput,
  CreateUserMutation,
  DeleteAppointmentInput,
  DeleteAppointmentMutation,
  DeleteUserInput,
  DeleteUserMutation,
  GetUserQuery,
  GetUserQueryVariables,
  ListUsersQuery,
  ListUsersQueryVariables,
  UpdateUserInput,
  UpdateUserMutation
} from './API';
import * as mutations from './graphql/mutations';
import * as queries from './graphql/queries';

export const getUser = async (
  variables: GetUserQueryVariables
): Promise<GetUserQuery> => {
  const result = (await API.graphql(
    graphqlOperation(queries.getUser, variables)
  )) as GraphQLResult;
  return result.data as GetUserQuery;
};

export const getUsers = async (variables: ListUsersQueryVariables) => {
  const result = (await API.graphql(
    graphqlOperation(queries.listUsers, variables)
  )) as GraphQLResult;
  return result.data as ListUsersQuery;
};

export const createUser = async (
  input: CreateUserInput
): Promise<CreateUserMutation> => {
  const result = (await API.graphql(
    graphqlOperation(mutations.createUser, { input })
  )) as GraphQLResult;
  return result.data as CreateUserMutation;
};

export const updateUser = async (
  input: UpdateUserInput
): Promise<UpdateUserMutation> => {
  const result = (await API.graphql(
    graphqlOperation(mutations.updateUser, { input })
  )) as GraphQLResult;
  return result.data as UpdateUserMutation;
};

export const deleteUser = async (input: DeleteUserInput) => {
  const result = (await API.graphql(
    graphqlOperation(mutations.deleteUser, { input })
  )) as GraphQLResult;
  return result.data as DeleteUserMutation;
};

export const createAppointment = async (input: CreateAppointmentInput) => {
  const result = (await API.graphql(
    graphqlOperation(mutations.createAppointment, { input })
  )) as GraphQLResult;
  return result.data as CreateUserMutation;
};

export const deleteAppointment = async (input: DeleteAppointmentInput) => {
  const result = (await API.graphql(
    graphqlOperation(mutations.deleteAppointment, { input })
  )) as GraphQLResult;
  return result.data as DeleteAppointmentMutation;
};
