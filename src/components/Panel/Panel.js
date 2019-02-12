import React, {Fragment} from 'react';
import { Title, ClientPanel , SellerPanel} from "../Index.components";

const Panel = () => {
  return (
    <Fragment>
      <Title title='Top 10 Clients'/>
      <ClientPanel/>
      <Title title='Top 10 best Sellers'/>
      <SellerPanel/>
    </Fragment>
  );
};

export default Panel;