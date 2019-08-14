import React from 'react';
import Head from 'next/head';

export default function CastReceiver() {
  return (
    <Head>
      <script src="//www.gstatic.com/cast/sdk/libs/caf_receiver/v3/cast_receiver_framework.js" />
    </Head>
  );
}
