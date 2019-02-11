import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import {Title} from "../../components/Index.components";
import CloseSession from "./CloseSession";

const Header = ({ session }) => {

  let bar = (session.getUser) ? <NavigationAuth/> : <NavigationNoAuth/>
  return (
  <nav className="navbar navbar-expand-lg navbar-dark bg-primary justify-content-between d-flex mb-4">
    <div className="container">
      { bar }    
    </div>
  </nav>
  )
};

const NavigationNoAuth = () => (
  <Title title="CRM" addClass="navbar-brand text-light font-weight-bold"> CRM </Title>
);

const NavigationAuth = () => (
  <Fragment>
    <Link to="/" className="navbar-brand text-light font-weight-bold">
      CRM
    </Link>
    <button
      className="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navegacion"
      aria-controls="navegacion"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>

    <div className="collapse navbar-collapse" id="navegacion">
      <ul className="navbar-nav ml-auto text-right">
        <li className="nav-item dropdown">
          <button
            className="nav-link dropdown-toggle btn btn block btn-success"
            data-toggle="dropdown"
          >
            Clients
          </button>
          <div className="dropdown-menu" aria-labelledby="navegacion">
            <Link className="dropdown-item" to="/">
              List Clients
            </Link>
            <Link className="dropdown-item" to="/client/new">
              New Client
            </Link>
          </div>
        </li>
        <li className="nav-item dropdown ml-2">
          <button
            className="nav-link dropdown-toggle btn btn block btn-success"
            data-toggle="dropdown"
          >
            Products
          </button>
          <div className="dropdown-menu" aria-labelledby="navegacion">
            <Link className="dropdown-item" to="/products">
              List Products
            </Link>
            <Link className="dropdown-item" to="/product/new">
              New Product
            </Link>
          </div>
        </li>
        <li className="nav-item dropdown ml-2">
          <CloseSession/>
        </li>
      </ul>
    </div>
  </Fragment>
);

export default Header;
