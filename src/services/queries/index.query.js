import gql from "graphql-tag";


export const CLIENTS_QUERY = gql`
  query getClients($limit: Int, $offset: Int){
    getClients(limit: $limit, offset: $offset){
      id
      name
      surname
      company
    }
    totalClients
  }
`;

export const CLIENT_QUERY = gql`
  query getClient($id: ID) {
    getClient (id: $id) {
      id
      name
      surname
      type
      years
      emails{
        email
      }
      company
    }
}`


export const PRODUCTS_QUERY = gql`
  query getProducts($limit: Int, $offset: Int, $hasStock: Boolean){
    getProducts(limit: $limit, offset: $offset, hasStock: $hasStock){
      id
      name
      price
      stock
    }
    totalProducts
  }
`;

export const PRODUCT_QUERY  = gql`
  query getClient($id: ID) {
    getProduct (id: $id) {
      id
      name
      price
      stock
    }
}`

