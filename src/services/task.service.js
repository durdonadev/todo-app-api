import { prisma } from "../prisma/index.js";
import { CustomError } from "../utils/custom.error.js";

class TaskService {
    create = async (input, userId) => {
        const task = await prisma.task.create({
            data: {
                ...input,
                userId: userId
            },
            select: {
                title: true,
                description: true,
                due: true,
                status: true,
                id: true
            }
        });

        return task;
    };

    getOne = async (id, userId) => {
        const task = await prisma.task.findUnique({
            where: {
                id: id
            }
        });

        if (!task) {
            throw new CustomError("Task does not exist", 404);
        }

        if (task.userId !== userId) {
            throw new CustomError(
                "Forbidden: This task does not belong to you!",
                403
            );
        }

        return task;
    };

    getAll = async (userId) => {
        const tasks = await prisma.task.findMany({
            where: {
                userId: userId
            }
        });

        return tasks;
    };

    update = async (id, userId, update) => {
        await prisma.task.update({
            where: {
                id: id,
                userId: userId
            },
            data: {
                ...update
            }
        });
    };

    delete = async (id, userId) => {
        const task = await prisma.task.findUnique({
            where: {
                id: id
            }
        });

        if (task.id !== id) {
            throw new CustomError("Task with this ID does not exist", 404);
        }

        if (task.userId !== userId) {
            throw new CustomError(
                "Forbidden: This task does not belong to you!",
                403
            );
        }

        await prisma.task.delete({
            where: {
                id: id
            }
        });
    };

    changeStatus = async (id, userId, status) => {
        await prisma.task.update({
            where: {
                id: id,
                userId: userId
            },

            data: {
                status: status
            }
        });
    };
}

export const taskService = new TaskService();
