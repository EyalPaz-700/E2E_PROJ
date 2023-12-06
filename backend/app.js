var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

var indexRouter = require("./routes/index");
var todosRouter = require("./routes/todos");
var loginRouter = require("./routes/login");
var postsRouter = require("./routes/posts");
var commentsRouter = require("./routes/comments");
var app = express();

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/todos", todosRouter);
app.use("/login", loginRouter);
app.use("/posts", postsRouter);
app.use("/comments", commentsRouter);
module.exports = app;
