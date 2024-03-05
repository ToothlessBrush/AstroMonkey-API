import { Request, Response } from "express";
import {
    getBotGuildsServices,
    getMutualGuildsServices,
    getUserGuildsServices,
} from "../../services/guilds";
import { IUser } from "../../database/model/User";

export async function getGuildsController(req: Request, res: Response) {
    const user = req.user as IUser;
    try {
        const guilds = await getMutualGuildsServices(user._id);

        res.send({ guilds });
    } catch (error) {
        console.error(error);
        res.sendStatus(400).send("Bad Request");
    }
}
