import { gql, useMutation, useQuery } from "@apollo/client";

const LOGIN_ADMIN_USER_MUTATION = gql`
  mutation loginAdminUser($input: LoginAdminUserInput!) {
    loginAdmin(input: $input) {
      id
      token
      companyId
    }
  }
`;

const CREATE_TEAM_MEMBER = gql`
  mutation createTeamMember($input: String!) {
    createTeamMember(id: $input) {
      id
      email
    }
  }
`;

const GET_ADMIN_USER_DETAILS = gql`
  query adminUser($input: String!) {
    adminUser(id: $input) {
      id
      email
      first_name
      last_name
      username
      location
      companyId
      company {
        id
        name
      }
    }
  }
`;

export const useGetAdminUser = (options = {}) =>
  useQuery(GET_ADMIN_USER_DETAILS, options);

export const useLoginAdmin = (options = {}) =>
  useMutation(LOGIN_ADMIN_USER_MUTATION, options);

export const useCreateNewTeamMember = (options = {}) =>
  useMutation(CREATE_TEAM_MEMBER, options);
