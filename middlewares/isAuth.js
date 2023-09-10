module.exports = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error_msg", "you are not logged in");
    res.redirect("/login");
  }
  next();
};
