import gql from 'graphql-tag'

export const NEW_CLIENT = gql`

mutation setCliente($input: ClientInput){
  setClient(input:$input) {
    id
    nombre
    apellido
  }
}
`