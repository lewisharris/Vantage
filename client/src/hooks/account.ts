import { gql, useMutation, useQuery, useLazyQuery } from "@apollo/client";

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

const CREATE_COMPANY = gql`
  mutation createCompany($input: createCompanyInput!) {
    createCompany(input: $input) {
      id
      name
    }
  }
`;

const REGISTER_USER = gql`
  mutation registerUser($input: RegisterUserInput!) {
    registerUser(input: $input) {
      id
      token
    }
  }
`;

const REGISTER_MEMBER = gql`
  mutation registerMember($input: RegisterUserInput!) {
    registerMember(input: $input) {
      id
      email
    }
  }
`;

const FIND_MEMBERS = gql`
  query findMembers($input: String!) {
    findMembers(companyId: $input) {
      users {
        id
        first_name
        last_name
        email
      }
    }
  }
`;
export const useCreateCompany = (options = {}) =>
  useMutation(CREATE_COMPANY, options);

export const useGetAdminUser = (options = {}) =>
  useQuery(GET_ADMIN_USER_DETAILS, options);

export const useLoginAdmin = (options = {}) =>
  useMutation(LOGIN_ADMIN_USER_MUTATION, options);

export const useCreateNewTeamMember = (options = {}) =>
  useMutation(CREATE_TEAM_MEMBER, options);

export const useRegisterUser = (options = {}) =>
  useMutation(REGISTER_USER, options);

export const useRegisterMember = (options = {}) =>
  useMutation(REGISTER_MEMBER, options);

export const useFindMembers = (options = {}) =>
  useLazyQuery(FIND_MEMBERS, options);
