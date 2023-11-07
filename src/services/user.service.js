import { prisma } from "../prisma/index.js";
import { bcrypt } from "../utils/bcrypt.js";
import { crypto } from "../utils/crypto.js";
import { mailer } from "../utils/mailer.js";
import { date } from "../utils/date.js";
import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";

class UserService {
    signUp = async (input) => {
        const hashedPassword = await bcrypt.hash(input.password);
        const activationToken = crypto.createToken();
        const hashedActivationToken = crypto.hash(activationToken);
        await prisma.user.create({
            data: {
                ...input,
                password: hashedPassword,
                activationToken: hashedActivationToken
            }
        });
        await mailer.sendActivationMail(input.email, activationToken);
    };
}

export const userService = new UserService();
