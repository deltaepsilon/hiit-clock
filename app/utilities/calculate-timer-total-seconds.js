export default ({ periods }) =>
  periods.reduce((total, { totalSeconds }) => total + totalSeconds, 0);
