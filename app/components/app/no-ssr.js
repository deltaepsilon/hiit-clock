import React from 'react';
import dynamic from 'next/dynamic';

export default dynamic(
  ({ children }) => {
    return (
      <div>
        <h1>Page Header</h1>
      </div>
    );
  },
  { ssr: false }
);
