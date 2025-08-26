import React from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';

const Canonical = ({ url }) => (
  <Helmet>
    <link rel="canonical" href={url} />
  </Helmet>
);

export default Canonical;