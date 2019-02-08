import gql from "graphql-tag";

export const NEW_CLIENT = gql`
  mutation setClient($input: ClientInput) {
    setClient(input: $input) {
      id
      name
      surname
    }
  }
`;

export const UPDATE_CLIENT = gql`
  mutation updateClient($input: ClientInput) {
    uploadClient(input: $input) {
      id
      name
      surname
      type
      years
      company
      emails {
        email
      }
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


export const UPDATE_PRODUCT = gql`
  mutation uploadProduct($input: ProductInput) {
    uploadProduct(input: $input) {
      name
      price
      stock
    }
  }
`;


//Oders 

export const NEW_ORDER = gql`
  mutation setOrders($input: OrderInput){
    setOrders(input: $input){
      id
    }
  }
`;

export const UPDATE_ORDERS = gql`
  mutation updateOrders($input: OrderInput){
    updateOrders(input: $input){
      id
      date
      total
      state
      order{
        id
        quantity
      }
    }
  }
`;
// Users

export const CREATE_USER = gql`
  mutation createUser($user: String!, $password: String!){
    createUser(user: $user, password: $password)
  }
`;
