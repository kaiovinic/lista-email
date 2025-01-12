const express = require("express");
const path = require("node:path");
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

let emails = [];

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/signup", (req, res) => {
  const { email } = req.body;
  if (email) {
    emails.push(email);
    res.redirect("/success");
  } else {
    res.redirect("/");
  }
});

app.get("/success", (req, res) => {
  res.render("success");
});

app.get("/emails", (req, res) => {
  res.render("emails", { emails: emails });
});

app.post("/emails/delete", (req, res) => {
  const { email } = req.body;
  emails = emails.filter((e) => e !== email);
  res.redirect("/emails");
});

const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Servidor Express iniciado em http://localhost:${PORT}/`);
});
