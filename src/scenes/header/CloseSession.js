import React from 'react';
import { ApolloConsumer } from "react-apollo";
import { withRouter } from "react-router-dom";

const closeSessionUser = (client, history) => {
      // delete token
      localStorage.removeItem('tokenGraphl', '');
      // desloguear user
      client.resetStore();
      // redirect
      history.push('/login');
}

const CloseSession = ({history}) => (
    <ApolloConsumer>
      { client => {

        return (
          <button
            onClick={()=> closeSessionUser(client, history)}
            className="nav-link btn btn-secondary">
              Sign Out
          </button>
        );

      }}

    </ApolloConsumer>
  
)

export default withRouter(CloseSession);