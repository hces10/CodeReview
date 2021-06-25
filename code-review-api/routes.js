const express = require("express");
const AuthController = require("./controllers/AuthController");

const routes = express.Router();


routes.post("/register", AuthController.register);
// routes.get("/notes", NotesController.list);
// routes.post("/notes", NotesController.create);
// routes.post("/notes/:id", NotesController.update);
// routes.delete("/notes/", NotesController.delete);


routes.get("/", (req, res) => {
  return res.json({ notes: "notes" });
});

module.exports = routes;
