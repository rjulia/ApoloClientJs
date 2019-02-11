import gql from "graphql-tag";

// CLientes
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
// clientes graficas
export const TOP_CLIENTS = gql`
  query topClients{
    topClients{
      total
      client{
        namecomplete
      }
    }
  }
`;

//products
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

//orders
export const ORDERS_QUERY = gql`
  query getOrders($client: String){
    getOrders(client: $client){
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

export const CURRENT_USER = gql`
  query getUser{
    getUser{
      id
      user
      name
      rol
    }
  }
`;




