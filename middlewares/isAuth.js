module.exports = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.flash("error_msg", "you are not logged in");
    return res.redirect("/login");
  }
  next();
};
