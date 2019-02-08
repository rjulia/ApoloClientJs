import React, {Fragment} from 'react';
import { Title, ClientPanel } from "../Index.components";

const Panel = () => {
  return (
    <Fragment>
      <Title title='Top 10 cliente que mas compran'/>
      <ClientPanel/>

    </Fragment>
  );
};

export default Panel;