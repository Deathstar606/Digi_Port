var express = require("express");
var path = require("path");
var logger = require("morgan");
var bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const passport = require("passport");

const connectToDatabase = require("./utils/db");
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
mongoose.set("bufferCommands", false); // 💡 prevent buffering when disconnected

var index = require("./routes/index");
var users = require("./routes/users");
var cases = require("./routes/caseRouter");
var people = require("./routes/peopleRouter");
var email = require("./routes/sendMessageRoute");

const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      "http://localhost:3000",
      "https://deathstar606.github.io",
    ];
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      console.log("allowed origin: ", origin);
      callback(null, true);
    } else {
      console.log("denied origin: ", origin);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // Allow sending cookies and other credentials with the request
  optionsSuccessStatus: 200, // Set the successful response status code for preflight requests
};

var app = express();

app.use(cors(corsOptions));

app.use(passport.initialize());

app.use(passport.session());

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(async (req, res, next) => {
  try {
    await connectToDatabase();
    next();
  } catch (err) {
    console.error("Error connecting to DB:", err);
    res.status(500).json({ error: "Database connection error" });
  }
});

app.use("/", index);
app.use("/users", users);

app.use(express.static(path.join(__dirname, "public")));

app.use("/cases", cases);
app.use("/people", people);
app.use("/send-mail", email);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500);
  res.render("error", {
    title: "Error", // Ensure 'title' is defined
    message: err.message,
    error: err,
  });
});

const http = require("http");
const server = http.createServer(app);
server.setTimeout(10000); // 10 seconds
server.listen(process.env.PORT || 9000, () => {
  console.log("Server listening on port", process.env.PORT || 9000);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error("Not Found");
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

/////////////////////test to see real/////////////////////
