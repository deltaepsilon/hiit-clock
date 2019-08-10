import { useContext } from 'react';
import { AlertsContext } from '../contexts/alerts-context';

export default function useAlert() {
  const { alert } = useContext(AlertsContext);

  return alert;
}
