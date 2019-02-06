import React from 'react';
import { Mutation  } from "react-apollo";
import { NEW_ORDER } from "../../services/mutations/index.mutations";

import { withRouter } from "react-router-dom";
const validatorOrder = (props) => {
    let noValid = !props.products || props.total === 0;
    return noValid;

}



const GeneratorOrder = (props) => {


  return (
    <Mutation mutation={NEW_ORDER}
      onCompleted={() => props.history.push('/')}>
      {setOrders => (
          <button 
            disabled={validatorOrder(props)}
            type="button" 
            className="btn btn-info"
            onClick={ e => {
              const productsInput = props.products.map(({name, price, stock, ...obj})=> obj);

              const input = {
                order: productsInput,
                total: props.total,		
                client: props.idClient,
              }
              setOrders({
                variables: {input}
              })
            }}
            >Generate order
          </button>
    )}
    </Mutation>
  );
};

export default withRouter(GeneratorOrder);
