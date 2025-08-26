import React from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';

const GoogleSiteVerification = ({ code }) => (
  <Helmet>
    <meta name="google-site-verification" content={code} />
  </Helmet>
);

export default GoogleSiteVerification;
