function chechUser(req, res, next) {
  const user_tb = req.session.user_tb;
  if (!user_tb) {
    req.flash("error", "Please login");
    return res.redirect("/login");
  }
  next();
}
module.exports = chechUser;
