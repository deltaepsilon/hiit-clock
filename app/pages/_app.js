import React from 'react';
import App, { Container } from 'next/app';

export default class AppOverride extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <Container>
        <title>HiiT Clock</title>

        <Component {...pageProps} />
      </Container>
    );
  }
}
