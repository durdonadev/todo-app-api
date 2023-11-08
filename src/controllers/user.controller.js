import { userService } from "../services/user.service.js";
import { catchAsync } from "../utils/catch-async.js";

class UserController {
    signUp = catchAsync(async (req, res) => {
        const { body } = req;

        const input = {
            email: body.email,
            preferredFirstName: body.preferredFirstName,
            firstName: body.firstName,
            lastName: body.lastName,
            password: body.password
        };

        await userService.signUp(input);
        res.status(201).json({ message: "Success" });
    });

    login = catchAsync(async (req, res) => {
        const { body } = req;
        const input = {
            email: body.email,
            password: body.password
        };

        const jwt = await userService.login(input);
        res.status(200).json({
            token: jwt
        });
    });

    getMe = catchAsync(async (req, res) => {
        const { userId } = req;

        const me = await userService.getMe(userId);

        res.status(200).json({
            data: me
        });
    });

    logout = catchAsync(async (req, res) => {
        res.status(200).send({
            token: ""
        });
    });
}

export const userController = new UserController();
