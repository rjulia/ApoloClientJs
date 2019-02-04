import React from "react";
import {Product} from '../index.scenes'

const Table = (props) => {
    
  const products = props.products;
  let headTables = ['']

  if(products.length === 0) {
    return <div className="mt-5"> Select at least one product</div>;
  } else {
    const objKey = Object.keys(products[0]);
    headTables = [
      ...objKey,
      'Quantity', 
      'Delete']

  };

  return (
    <table className="table table-striped mt-5">
      <thead>
        <tr className="table-primary">
          {headTables.map((key, index) => (
            <th key={index} scope="col">
              {key}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {products.map((product, index) => {
          return (
            <Product key={product.id} index={index} product={product}/>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
