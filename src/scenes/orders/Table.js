import React from "react";
import {Product} from '../index.scenes'

const Table = (props) => {
    
  const products = props.products;
  let headTables = ['']

  if(products.length === 0) {
    return <div className="mt-5"> Select at least one product</div>;
  } else {
    headTables = [
       'id',
       'name',
       'price',
       'stock',
      'quantity', 
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
            <Product 
              key={product.id} 
              index={index} 
              product={product}
              updateQuantity={props.updateQuantity}
              deleteProduct={props.deleteProduct}
              />
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
