const { Sequelize, QueryTypes, where } = require("sequelize");
const bcrypt = require("bcrypt");
const fs = require("fs");
const config = require("../config/config.json");
const { User_tb, Provinsi_tb, Kabupaten_tb } = require("../models");

async function renderLogin(req, res) {
  const user_tb = req.session.user;
  if (user_tb) {
    req.flash("warning", "User tidak ditemukan");
    res.redirect("/");
  } else {
    res.render("auth-login", { user_tb: user_tb });
  }
}
async function renderRegister(req, res) {
  const user_tb = req.session.user_tb;
  if (user_tb) {
    res.redirect("/");
  } else {
    res.render("auth-register", { user_tb: user_tb });
  }
}

async function authLogin(req, res) {
  const { email, password } = req.body;
  // console.log(`yang mau login : ${email}  ${password}`);

  //check kalau usernya ada atau tidak
  const user_tb = await User_tb.findOne({
    where: {
      email: email,
    },
  });
  if (!user_tb) {
    req.flash("error", "User tidak ditemukan");
    return res.redirect("/login");
  }
  //check kalau passwordnya salah

  const isValidated = await bcrypt.compare(password, user_tb.password); //return sebuah booleh apakah true atau false
  if (!isValidated) {
    req.flash("error", "Password missmatch");
    return res.redirect("/login");
  }
  let loggedInUser = user_tb.toJSON(); //convert dari object sequelize ke object biasa

  delete loggedInUser.password;
  console.log("user setelah passwordnya di delete", loggedInUser);

  req.session.user_tb = loggedInUser;
  req.flash("success", `Selamat datang, ${loggedInUser.name}`);
  res.redirect("/");
}

async function authRegister(req, res) {
  const { name, email, password, confirmPassword } = req.body; //object destructuring

  if (password != confirmPassword) {
    req.flash("error", "Password dan Confirm password tidak sesuai");
    return res.render("/register");
  }
  const user_tb = await User_tb.findOne({
    where: {
      email: email,
    },
  });

  if (user_tb) {
    req.flash("error", "Email sudah terpakai");
    return res.redirect("/register");
  }

  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const newUser = {
    name: name,
    email: email,
    password: hashedPassword,
  };

  console.log("user baru :", newUser);

  const userInsert = await User.create(newUser);

  req.flash("success", "Berhasil register silahkan login");
  res.redirect("/login");
}

async function renderHome(req, res) {
  const user = req.session.user;
  res.render("index", { user: user });
}

async function renderError(req, res) {
  const user = req.session.user;
  res.render("page-404", { user: user });
}
module.exports = {
  renderHome,
  renderLogin,
  renderRegister,
  authLogin,
  authRegister,
  authLogout,
  renderError,
};
