import React from 'react';
import { Helmet } from '@dr.pogodin/react-helmet';

const GoogleAnalytics = ({ id }) => (
  <Helmet>
    <script async src={`https://www.googletagmanager.com/gtag/js?id=${id}`} />
    <script>
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${id}');
      `}
    </script>
  </Helmet>
);

export default GoogleAnalytics;
