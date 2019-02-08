import React, { Component, Fragment } from "react";
import { ApolloProvider } from "react-apollo";
import ApolloCliente, { InMemoryCache } from "apollo-boost";
import {Header, Clients, NewClient, EditClient, NewProduct, Products, EditProduct, NewOrder, ListOrders } from "./scenes/index.scenes";

import { Panel } from "./components/Index.components";
import { Register } from "./Auth/index.auth";
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
                <Route exact path="/products" component={Products}/>
                <Route exact path="/product/new" component={NewProduct}/>
                <Route exact path="/product/edit/:id" component={EditProduct}/>
                <Route exact path="/order/new/:id" component={NewOrder}/>
                <Route exact path="/orders/:id" component={ListOrders}/> 
                <Route exact path="/panel" component={Panel}/> 
                <Route exact path="/register" component={Register}/> 

              </Switch>
            </div>
          </Fragment>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
