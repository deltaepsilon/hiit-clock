import React from 'react';
import Head from 'next/head';

export default props => {
  return (
    <Head>
      <script async src="https://www.googletagmanager.com/gtag/js?id=UA-6859198-23" />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
          
            gtag('config', 'UA-6859198-23');
          `,
        }}
      />
    </Head>
  );
};
