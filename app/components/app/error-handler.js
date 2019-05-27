import React, { useContext } from 'react';
import { ErrorsContext } from '../contexts/errors-context';
import { SnackbarQueue } from '@rmwc/snackbar';

export default () => {
  const { queue } = useContext(ErrorsContext);

  return <SnackbarQueue messages={queue.messages} stacked />;
};
