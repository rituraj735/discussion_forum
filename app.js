var express = require("express");
var app = express();
const expressLayouts = require("express-ejs-layouts");

const PORT = process.env.PORT || 3000;

app.use(expressLayouts);
app.set("view engine", "ejs");
app.use("/", require("./routes/index"));
app.use("/users", require("./routes/users"));

app.listen(PORT, function () {
  console.log("Server listening at", PORT);
});
