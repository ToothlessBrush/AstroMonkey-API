import express, { Express } from "express";
import { config } from "dotenv";
config();
import cors from "cors";
import routes from "../routes";
import session from "express-session";
import passport from "passport";
require("../strategies/discord");

/**
 * @brief Creates an Express app
 *
 * @returns {Express}
 */
function createApp(): Express {
    console.log(`Creating app`);
    //express.json() is a middleware that parses incoming requests with JSON payloads
    const app = express();

    app.use(express.json());
    app.use("/api", routes);

    // enable CORS - Cross Origin Resource Sharing
    app.use(
        cors({
            origin: ["http://localhost:3000"],
            credentials: true,
        })
    );

    app.use(
        session({
            secret: "KALJBNFLKJASDBFOIASJDNFKLAJHSDF",
            resave: false,
            saveUninitialized: false,
            cookie: {
                maxAge: 60000 * 60 * 24 * 7, // 7 days
            },
        })
    );

    app.use(passport.initialize());
    app.use(passport.session());

    return app;
}

export default createApp;
