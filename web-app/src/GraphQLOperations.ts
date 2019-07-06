import { API, graphqlOperation } from 'aws-amplify';
import {
  GetUserQueryVariables,
  GetUserQuery,
  CreateUserInput,
  CreateUserMutation,
  ListUsersQuery,
  ListUsersQueryVariables
} from './API';
import * as queries from './graphql/queries';
import * as mutations from './graphql/mutations';
import { GraphQLResult } from '@aws-amplify/api/lib/types';

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
