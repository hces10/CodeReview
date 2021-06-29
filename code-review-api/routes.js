const express = require("express");
const AuthController = require("./controllers/AuthController");
const QuestionController = require("./controllers/QuestionController");
const routes = express.Router();

routes.post("/register", AuthController.register);
routes.get("/question", QuestionController.list);
routes.post("/question", QuestionController.save);

module.exports = routes;
