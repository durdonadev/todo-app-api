import { Router } from "express";
import { userMiddleware } from "../middlewares/user.middleware.js";
import { taskController } from "../controllers/task.controller.js";

const taskRouter = Router();

taskRouter.post("/", userMiddleware.authenticate, taskController.create);
taskRouter.get("/:id", userMiddleware.authenticate, taskController.getOne);
taskRouter.get("/", userMiddleware.authenticate, taskController.getAll);
taskRouter.patch("/:id", userMiddleware.authenticate, taskController.update);
taskRouter.delete("/:id", userMiddleware.authenticate, taskController.delete);
taskRouter.patch(
    "/:id/reactivate",
    userMiddleware.authenticate,
    taskController.changeStatus
);

export { taskRouter };
