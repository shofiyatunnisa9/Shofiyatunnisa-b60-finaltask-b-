const { Sequelize, QueryTypes, where } = require("sequelize");
const bcrypt = require("bcrypt");
const fs = require("fs");

const config = require("../config/config.json");
const { User_tb, Provinsi_tb, Kabupaten_tb } = require("../models");
const provinsi_tb = require("../models/provinsi_tb");
const saltRounds = 10;

async function renderLogin(req, res) {
  const user_tb = req.session.user_tb;
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
  req.flash("success", `Selamat datang, ${loggedInUser.username}`);
  res.redirect("/");
}

async function authRegister(req, res) {
  const { username, email, password, confirmPassword } = req.body; //object destructuring

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
    username: username,
    email: email,
    password: hashedPassword,
  };

  console.log("user baru :", newUser);

  const userInsert = await User_tb.create(newUser);

  req.flash("success", "Berhasil register silahkan login");
  res.redirect("/login");
}

async function renderHome(req, res) {
  const user_tb = req.session.user_tb;
  res.render("index", { user_tb: user_tb });
}
async function authLogout(req, res) {
  //hapus user dari session
  req.session.user_tb = null;
  res.redirect("/login");
}
async function renderProvinsi(req, res) {
  const user_tb = req.session.user_tb;

  const provinsi_tbs = await Provinsi_tb.findAll({
    include: {
      model: User_tb,
      as: "user_tb",
      attributes: { exclude: ["password"] },
    },
    order: [["createdAt", "DESC"]],
  });

  console.log("hasil fetch data dari controller", provinsi_tbs);

  if (user_tb) {
    res.render("list-provinsi", {
      provinsi_tbs: provinsi_tbs,
      user_tb: user_tb,
    });
  } else {
    res.render("list-provinsi", { provinsi_tbs: provinsi_tbs });
  }
}
async function addProvinsi(req, res) {
  try {
    const user_tb = req.session.user_tb;
    if (!user_tb) {
      req.flash("error", "Please login");
      return res.redirect("/login");
    }

    const { nama, diresmikan, pulau } = req.body;
    if (!nama || !diresmikan || !pulau || !req.file) {
      req.flash("error", "Semua kolom wajib diisi.");
      return res.redirect("/add-provinsi");
    }

    const photoPath = req.file.path || "https://picsum.photos/200/250";
    await Provinsi_tb.create({
      nama,
      diresmikan,
      pulau,
      photo: photoPath,
      user_id: user_tb.id,
    });

    req.flash("success", "Provinsi berhasil ditambahkan.");
    return res.redirect("/list-provinsi");
  } catch (error) {
    console.error("Error saat menambahkan provinsi:", error);
    req.flash("error", "Terjadi kesalahan pada server.");
    return res.redirect("/add-provinsi");
  }
}
// async function addProvinsi(req, res) {
//   const user_tb = req.session.user_tb;

//   if (!user_tb) {
//     req.flash("error", "Please login");
//     return res.redirect("/login");
//   }
//   const { nama, diresmikan, pulau } = req.body;

//   let dummyImage = "https://picsum.photos/200/250";

//   const photopath = req.file.path;
//   await Provinsi_tb.create({
//     nama, //ini asma saja dengan menulisakan title : totle
//     diresmikan,
//     photo: photopath,
//     user_id: user_tb.id,
//     pulau,
//   });

//   res.redirect("/list-provinsi");
// }
async function renderAddProvinsi(req, res) {
  res.render("add-provinsi");
}
async function renderProvinsiDetail(req, res) {
  const user_tb = req.session.user_tb;
  const id = req.params.id;

  const projectYangDipilih = await Provinsi_tb.findOne({
    where: {
      id: id,
    },
  });

  if (projectYangDipilih === null) {
    res.render("page-404");
  } else {
    console.log("v2 project detail :", projectYangDipilih);
    res.render("detail-provinsi", {
      provinsi_tb: projectYangDipilih,
      user_tb: user_tb,
    });
  }
}
///KABUPATEN
async function renderKabupaten(req, res) {
  const user_tb = req.session.user_tb;
  res.render("list-kabupaten");
}
async function addKabupaten(req, res) {
  const user_tb = req.session.user_tb;

  if (!user_tb) {
    req.flash("error", "Please login");
    return res.redirect("/login");
  }
  const { nama, diresmikan } = req.body;

  let dummyImage = "https://picsum.photos/200/250";

  const photo = req.file.path;
  const newKabupaten = {
    nama, //ini asma saja dengan menulisakan title : totle
    diresmikan,
    provinsi_id: user_tb.id,
    photo: photo,
  };
  const resultSubmit = await Kabupaten_tb.create(newKabupaten);
  console.log();
  res.redirect("/list-kabupaten");
}
async function renderAddKabupaten(req, res) {
  res.render("add-kabupaten");
}

async function renderError(req, res) {
  const user_tb = req.session.user_tb;
  res.render("page-404", { user_tb: user_tb });
}
module.exports = {
  renderHome,
  renderLogin,
  renderRegister,
  authLogin,
  authRegister,
  authLogout,
  renderError,
  renderProvinsi,
  renderProvinsiDetail,
  addProvinsi,
  renderAddProvinsi,
  renderKabupaten,
  addKabupaten,
  renderAddKabupaten,
};
