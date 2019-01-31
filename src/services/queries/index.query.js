import gql from "graphql-tag";


export const CLIENTS_QUERY = gql`{
  getClients {
      id
      nombre
      apellido
      empresa
    }
  totalClients
}`

export const CLIENT_QUERY = gql`
  query getClient($id: ID) {
    getClient (id: $id) {
      id
      nombre
      apellido
      tipo
      edad
      emails{
        email
      }
      empresa
      id
    }
}`

