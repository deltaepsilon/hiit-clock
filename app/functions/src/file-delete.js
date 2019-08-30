module.exports = context => async ({ before, after }) => {
  const beforeTimer = before.data();
  const afterTimer = after.data();
  const removedTimers = findRemovedFiles(beforeTimer, afterTimer);

  return Promise.all(
    removedTimers.map(async filepath =>
      context.admin
        .storage()
        .bucket()
        .file(filepath)
        .delete()
    )
  );
};

function findRemovedFiles(beforeTimer, afterTimer) {
  const beforeFilepaths = new Set();
  const afterFilepaths = new Set();

  beforeFilepaths.add(extractFilePath(beforeTimer));
  afterFilepaths.add(extractFilePath(afterTimer));

  beforeTimer.periods.forEach(period => beforeFilepaths.add(extractFilePath(period)));
  afterTimer.periods.forEach(period => afterFilepaths.add(extractFilePath(period)));

  return [...beforeFilepaths].filter(
    beforeFilepath => beforeFilepath && !afterFilepaths.has(beforeFilepath)
  );
}

function extractFilePath(obj) {
  return obj && obj.file && obj.file.metadata ? obj.file.metadata.fullPath : null;
}
