module.exports = ({ admin, environment }) => {
  const db = admin.firestore();

  return {
    db,
    getTimerRef: key => db.collection('timers').doc(key),
    getTimersRef: () => db.collection('timers'),
  };
};
