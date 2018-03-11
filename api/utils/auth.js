const isLoggedIn = req =>
  req.session.user && req.session.user.id;

module.exports = {
  isLoggedIn,
};
