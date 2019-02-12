import React from 'react';
import { Link } from "react-router-dom";


const Btnregister = ({session}) => {

  const {rol} = session.session.getUser;
  if(rol !== 'ADMIN') return null
  return (
    <Link
      to="/register"
      className="nav-link btn btn-warning">
      Register
    </Link>
  );
};

export default Btnregister;