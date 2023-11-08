import { taskService } from "../services/task.service.js";
import { catchAsync } from "../utils/catch-async.js";
import { CustomError } from "../utils/custom.error.js";

class TaskController {
    create = catchAsync(async (req, res) => {
        const { body, userId } = req;

        const input = {
            title: body.title,
            description: body.description,
            due: body.due
        };

        if (!input.title || !input.description || !input.due) {
            throw new CustomError(
                "Title, Description and Due date are required",
                400
            );
        }

        const task = await taskService.create(input, userId);

        res.status(201).json({
            data: task
        });
    });

    getOne = catchAsync(async (req, res) => {
        const { userId, params } = req;

        const task = await taskService.getOne(params.id, userId);

        res.status(200).json({
            data: task
        });
    });

    getAll = catchAsync(async (req, res) => {
        const { userId } = req;

        const tasks = await taskService.getAll(userId);
        res.status(200).json({
            data: tasks
        });
    });
}

export const taskController = new TaskController();
