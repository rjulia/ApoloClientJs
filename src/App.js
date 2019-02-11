import React, { Fragment } from "react";

import {Header, Clients, NewClient, EditClient, NewProduct, Products, EditProduct, NewOrder, ListOrders } from "./scenes/index.scenes";

import { Panel } from "./components/Index.components";
import { Register, Login, Session } from "./Auth/index.auth";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";



const App = ({refetch, session}) => {
  const {getUser} = session;
  let name;
  if (getUser) {
    name = (getUser.name) ? getUser.name : getUser.user  
  }
  const message = (getUser) ? `Welcolme: ${name}`: <Redirect to="/login"/>;
  
  return (
      
        <Router>
          <Fragment>
            <Header session={session}/>
            <div className="container">
              <p className="text-right">{message} </p>
              <Switch>
                <Route exact path="/" component={Clients}/>
                <Route exact path="/client/new" render={()=> <NewClient session={session}/> }/>
                <Route exact path="/client/edit/:id" component={EditClient}/>
                <Route exact path="/products" component={Products}/>
                <Route exact path="/product/new" component={NewProduct}/>
                <Route exact path="/product/edit/:id" component={EditProduct}/>
                <Route exact path="/order/new/:id" component={NewOrder}/>
                <Route exact path="/orders/:id" component={ListOrders}/> 
                <Route exact path="/panel" component={Panel}/> 
                <Route exact path="/login" render={()=> <Login refetch={refetch}/> } /> 
                <Route exact path="/register" component={Register}/> 
              </Switch>
            </div>
          </Fragment>
        </Router>
    );
}

const RootSession = Session(App);

export {RootSession}
