import React from 'react';

const DetailProductOrder = (props) => {
  const {name, price} = props.product

  return (
    <div className=" border-bottom mb-2 pb-2">
      <p className="card-text font-weight-bold">
        Name Product:
        <span className="font-weight-normal" > {name}</span>
      </p>
      <p className="card-text font-weight-bold">
        Price: 
        <span className="font-weight-normal"> HKD ${price}</span>
      </p>
      <p className="card-text font-weight-bold">
        Quantity: 
        <span className="font-weight-normal"> {props.quantity} </span>
      </p>
    </div>
  );
};

export default DetailProductOrder;