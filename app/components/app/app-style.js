import React from 'react';
import Head from 'next/head';

export default function AppStyle() {
  return (
    <Head>
      <link rel="preload" as="stylesheet" href="/static/styles/app.css" />
    </Head>
  );
}
