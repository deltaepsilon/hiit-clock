/* globals window */
import React, { useCallback, useEffect, useState } from 'react';
import { createSnackbarQueue } from '@rmwc/snackbar';

export const ErrorsContext = React.createContext();

const queue = createSnackbarQueue();

export default ({ children }) => {
  const handleError = useCallback(
    error =>
      queue.notify({
        body: error.toString(),
      }),
    []
  );
  const value = { queue, handleError };

  useEffect(() => {
    window.handleEffectError = handleError;
  }, [handleError]);

  return (
    <ErrorBoundary handleError={handleError}>
      <ErrorsContext.Provider value={value}>{children}</ErrorsContext.Provider>
    </ErrorBoundary>
  );
};

class ErrorBoundary extends React.Component {
  componentDidCatch(error, info) {
    this.props.handleError({ error, info });
  }

  render() {
    return this.props.children;
  }
}
