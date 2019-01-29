import gql from 'graphql-tag'

export const NEW_CLIENT = gql`
  mutation setClient($input: ClientInput){
    setClient(input: $input) {
      id
      nombre
      apellido
    }
  }
`;