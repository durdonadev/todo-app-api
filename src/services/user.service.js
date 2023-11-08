import { prisma } from "../prisma/index.js";
import { bcrypt } from "../utils/bcrypt.js";
import { crypto } from "../utils/crypto.js";
import { mailer } from "../utils/mailer.js";
import { date } from "../utils/date.js";
import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import { CustomError } from "../utils/custom.error.js";

class UserService {
    signUp = async (input) => {
        const hashedPassword = await bcrypt.hash(input.password);

        await prisma.user.create({
            data: {
                ...input,
                password: hashedPassword
            },
            select: {
                id: true
            }
        });
    };

    login = async (input) => {
        const user = await prisma.user.findFirst({
            where: {
                email: input.email
            },
            select: {
                id: true,
                password: true
            }
        });

        if (!user) throw new CustomError("User does not exist", 404);

        const isPasswordMatches = await bcrypt.compare(
            input.password,
            user.password
        );

        if (!isPasswordMatches) {
            throw new CustomError("Invalid Credentials", 401);
        }

        const token = jwt.sign(
            {
                userId: user.id
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "2 days"
            }
        );

        return token;
    };
}

export const userService = new UserService();
