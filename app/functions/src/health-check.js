module.exports = ({ admin, environment }) => (req, res) => {
  const databaseUrl = admin
    .database()
    .ref()
    .toString();

  res.json({ databaseUrl, environment: environment.environment });
};
