const express = require("express");
const router = express.Router();
const controller = require("../controllers/todoController");

router.post("/", controller.createTodo);
router.get("/", controller.getTodos);
router.get("/:id", controller.getTodoById);
router.put("/:id", controller.updateTodo);
router.delete("/:id", controller.deleteTodo);
router.patch("/:id/complete", controller.toggleComplete);

module.exports = router;
