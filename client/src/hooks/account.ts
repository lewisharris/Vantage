import { gql, useMutation, useQuery } from "@apollo/client";

const LOGIN_ADMIN_USER_MUTATION = gql`
  mutation loginAdminUser($input: LoginAdminUserInput!) {
    loginAdminUser(input: $input) {
      user {
        id
        companyID
        token
      }
    }
  }
`;

export const useLoginAdmin = (options = {}) => {
  useMutation(LOGIN_ADMIN_USER_MUTATION, options);
};
