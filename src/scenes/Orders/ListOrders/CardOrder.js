import React from "react";
import { Query, Mutation } from "react-apollo";
import { Spinner, Title } from "../../../components/Index.components";
import { PRODUCT_QUERY } from '../../../services/queries/index.query';
import { UPDATE_ORDERS } from '../../../services/mutations/index.mutations';

import { DetailProductOrder } from "../../index.scenes";

const CardOrder = (props) => {

  const {date, total, id , order, state} = props.order
  const newdate = new Date(Number(date))

  let classStyle;

  switch (state) {
    case "PENDING":
      classStyle = 'border-warning';
      break;
    case "COMPLETE":
      classStyle = 'border-success';
      break;
    case "CANCELLED":
      classStyle = 'border-danger';
      break;
    default:
      break;
  }
  return <div className="col-md-4">
      <div className={`card mb-3 ${classStyle}`}>
        <div className="card-body">
          <p className="card-text font-weight-bold ">
            Estado:
            <Mutation mutation={UPDATE_ORDERS} >
              {updateOrders => (
                <select 
                  className="form-control my-3"
                  value={state} 
                  onChange={e => {
                    const input = { 
                      state: e.target.value, 
                      id, 
                      total, 
                      date, 
                      order,
                      client: props.clientId };
                    updateOrders({
                      variables: {input}
                    })
                  }} >
                  <option value="PENDING">PENDING</option>
                  <option value="COMPLETE">COMPLETE</option>
                  <option value="CANCELLED">CANCELLED</option>
                </select>
              )}
            </Mutation>
          </p>
          <p className="card-text font-weight-bold">
            Pedido ID:
            <span className="font-weight-normal"> {id}</span>
          </p>
          <p className="card-text font-weight-bold">
            Fecha Pedido:
            <span className="font-weight-normal">
              {" "}
              {newdate.toLocaleString("en-HK")}
            </span>
          </p>
          <p className="card-text font-weight-bold">
            Total:
            <span className="font-weight-normal"> HKD ${total} </span>
          </p>

          <Title heading={4} title="Articles in order" addClass={"titleColor"} />
          {order.map(product => {
            const { id, quantity } = product;
            return <Query key={product.id} query={PRODUCT_QUERY} variables={{ id }}>
                {({ loading, error, data }) => {
                  if (loading) return <Spinner color={"#18BC9C"} />;
                  if (error) return `Error: ${error.message}`;
                  return <DetailProductOrder product={data.getProduct} quantity={quantity} />;
                }}
              </Query>;
          })}
        </div>
      </div>
    </div>;
};

export default CardOrder;
