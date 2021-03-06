import React, { useContext } from 'react';
import { AlertsContext } from '../contexts/alerts-context';
import { SnackbarQueue } from '@rmwc/snackbar';

export default function AlertsHandler() {
  const { queue } = useContext(AlertsContext);

  return <SnackbarQueue messages={queue.messages} />;
}
