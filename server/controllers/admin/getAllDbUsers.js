module.exports = (req, res) => {
  const db = req.app.get("db");
  db.admin.getAllUsers().then((users) => {
    res.json(users);
  });
};
