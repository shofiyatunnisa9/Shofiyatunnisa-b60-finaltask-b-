const express = require("express");
const app = express();

const hbs = require("hbs");
const path = require("path");
const methodOverride = require("method-override");
const flash = require("express-flash");
const session = require("express-session");
const port = 3000;

const {
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
} = require("./controllers/controller");

const upload = require("./middleware/upload-file");
const chechUser = require("./middleware/auth");
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "./views"));

app.use(express.static("assets"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "./uploads"))); //agar bisa mengakses assets
app.use(methodOverride("_method"));
app.use(flash());
app.use(
  session({
    name: "my-session",
    secret: "akjhgt09876",
    resave: false,
    saveUninitialized: true,
  })
);
hbs.registerPartials(__dirname + "/views/partials", function (err) {});
hbs.registerHelper("equal", function (a, b) {
  return a === b;
});
//home
app.get("/", renderHome);
//login
app.get("/login", renderLogin);
//register
app.get("/register", renderRegister);
//logout
app.get("/logout", authLogout);
//authlogin
app.post("/login", authLogin);
//authregister
app.post("/register", authRegister);
//provinsi
app.get("/list-provinsi", renderProvinsi);

//add provinsi
app.post("/add-provinsi", chechUser, upload.single("image"), addProvinsi);

app.get("/add-provinsi", chechUser, renderAddProvinsi);

app.get("/detail-provinsi/:id", renderProvinsiDetail);

//add kab
app.get("/list-kabupaten", renderKabupaten);

//add kab
app.post("/add-kabupaten", chechUser, upload.single("image"), addKabupaten);

app.get("/add-kabupaten", chechUser, renderAddKabupaten);

//404
app.get("*", renderError);

app.listen(port, () => {
  console.log(`My app listening on port ${port}`);
});
