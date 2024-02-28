import { gql } from "@apollo/client";

export const loginMutation = gql`
  mutation ($email: String!, $password: String!) {
    Auth {
      loginJwt(input: { email: $email, password: $password }) {
        loginResult {
          jwtTokens {
            accessToken
          }
        }
      }
    }
  }
`;

export const getNodes = gql`
  query {
    Admin {
      Tree {
        GetContentNodes {
          edges {
            node {
              structureDefinition {
                title
              }
            }
          }
        }
      }
    }
  }
`;
