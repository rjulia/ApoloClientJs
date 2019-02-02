import gql from "graphql-tag";

export const NEW_CLIENT = gql`
  mutation setClient($input: ClientInput) {
    setClient(input: $input) {
      id
      nombre
      apellido
    }
  }
`;

export const UPDATE_CLIENT = gql`
  mutation updateClient($input: ClientInput) {
    uploadClient(input: $input) {
      nombre
      apellido
      tipo
      edad
      emails {
        email
      }
      empresa
      id
    }
  }
`;

export const DELETE_CLIENT = gql`
  mutation deleteCLient($id: ID!) {
    deleteClient(id: $id)
  }
`;

export const NEW_PRODUCT = gql`
  mutation setProduct($input: ProductInput) {
    setProduct(input: $input) {
      name
      price
      stock
    }
  }
`;



export const DELETE_PRODUCT = gql`
  mutation deleteProduct($id: ID!) {
    deleteProduct(id: $id)
  }
`;
