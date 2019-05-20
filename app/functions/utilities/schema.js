module.exports = ({ admin, environment }) => {
  const db = admin.firestore();

  return {
    db,
    getUserTimerRef: (userId, timerId) =>
      db
        .collection('users')
        .doc(userId)
        .collection('timers')
        .doc(timerId),
    getUserTimersRef: userId =>
      db
        .collection('users')
        .doc(userId)
        .collection('timers'),
  };
};
