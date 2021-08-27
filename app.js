var express = require("express");
var app = express();
const path = require("path");
const mongoose = require("mongoose");
const expressLayouts = require("express-ejs-layouts");
const passport = require("passport");
// Passport config
require("./config/passport")(passport);

const db = require("./config/keys").MongoURI;
const PORT = process.env.PORT || 3000;

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.use(express.static(path.join(__dirname, "/views/static")));
app.use(expressLayouts);
app.set("view engine", "ejs");
//Body Parser
app.use(express.urlencoded({ extended: false }));
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static("views"));
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

app.listen(PORT, function () {
  console.log("Server listening at", PORT);
});
