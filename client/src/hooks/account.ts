import { gql, useMutation, useQuery } from "@apollo/client";

const LOGIN_USER_MUTATION = gql`
  mutation loginUser($input: LoginUserInput!) {
    loginUser(input: $input) {
      id
      token
    }
  }
`;

export const useLogin = (options = {}) => {
  useMutation(LOGIN_USER_MUTATION, options);
};
