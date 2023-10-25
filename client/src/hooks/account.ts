import { gql, useMutation, useQuery } from "@apollo/client";

const LOGIN_ADMIN_USER_MUTATION = gql`
  mutation loginAdminUser($input: LoginAdminUserInput!) {
    loginAdmin(input: $input) {
      id
      token
    }
  }
`;

export const useLoginAdmin = (options = {}) =>
  useMutation(LOGIN_ADMIN_USER_MUTATION, options);
