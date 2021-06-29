if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}
const express = require("express");
const app = express();
const flash = require("connect-flash");
const session = require("express-session");
const passport = require('passport')

require('./config/passport')(passport)

const mongoose = require("mongoose");
mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connect to database"))
  .catch((err) => console.log(err));

const searchRoute = require("./routes/search");
const popularRoute = require("./routes/popular");
const usersRoute = require("./routes/users");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.use(
  session({
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// global vars

app.use(flash());
app.use((req, res, next) => {
    res.locals.currentUser = req.user
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error')
    res.locals.success = req.flash('success')
    next()
})

app.use("/", popularRoute);
app.use("/search", searchRoute);
app.use("/users", usersRoute);

app.listen(process.env.PORT || 3000, () => {
  console.log("started at 3000");
});
