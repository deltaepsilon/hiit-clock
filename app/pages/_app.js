import React from 'react';
import App from 'next/app';

export default class AppOverride extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <title>HiiT Clock</title>

        <Component {...pageProps} />
      </>
    );
  }
}
