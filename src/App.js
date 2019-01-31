import React, { Component, Fragment } from "react";
import { ApolloProvider } from "react-apollo";
import ApolloCliente, { InMemoryCache } from "apollo-boost";
import Header from "./scenes/header/Header";
import Clients from "./scenes/Clients";
import NewClient from "./scenes/NewClient";
import EditClient from "./scenes/EditClient";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const client = new ApolloCliente({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache({
    addTypename: false
  }),
  onError: ({ networkError, graphQLErrors }) => {
    console.log("graphql", graphQLErrors);
    console.log("networkgraphql", networkError);
  }
});
class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <Fragment>
            <Header />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Clients}/>
                <Route exact path="/client/new" component={NewClient}/>
                <Route exact path="/client/edit/:id" component={EditClient}/>
              </Switch>
            </div>
          </Fragment>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
