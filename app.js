var express = require("express");
var app = express();
const mongoose = require("mongoose");
const expressLayouts = require("express-ejs-layouts");

const db = require("./config/keys").MongoURI;
const PORT = process.env.PORT || 3000;

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected..."))
  .catch((err) => console.log(err));

app.use(expressLayouts);
app.set("view engine", "ejs");
//Body Parser
app.use(express.urlencoded({ extended: false }));

app.use(express.static("views"));
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

app.listen(PORT, function () {
  console.log("Server listening at", PORT);
});
