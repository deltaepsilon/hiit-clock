/* globals window */
import React, { useCallback, useEffect } from 'react';
import { createSnackbarQueue } from '@rmwc/snackbar';

export const AlertsContext = React.createContext();

const queue = createSnackbarQueue();

export default ({ children }) => {
  const handleError = useCallback(
    error =>
      queue.notify({
        body: error.toString(),
        actions: [
          {
            title: 'Dismiss',
          },
        ],
      }),
    []
  );

  const value = { queue, handleError, alert: handleError };

  useEffect(() => {
    window.handleEffectError = handleError;
  }, [handleError]);

  return (
    <ErrorBoundary handleError={handleError}>
      <AlertsContext.Provider value={value}>{children}</AlertsContext.Provider>
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
