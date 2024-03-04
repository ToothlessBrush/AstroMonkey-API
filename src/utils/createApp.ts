import express, { Express } from "express";
import { config } from "dotenv";
config();
import cors from "cors";
import routes from "../routes";
import session from "express-session";
import passport from "passport";
import store from "connect-mongo";
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

    // enable CORS - Cross Origin Resource Sharing
    app.use(
        cors({
            origin: [process.env.FRONTEND_URL!],
            credentials: true,
        })
    );

    // Express session middleware
    //need to add session store to save session between server restarts
    app.use(
        session({
            secret: process.env.SESSION_SECRET || "secret",
            resave: false,
            saveUninitialized: false,
            cookie: {
                maxAge: 60000 * 60 * 24 * 7, // 7 days
            },
            store: store.create({
                mongoUrl: process.env.MONGO_URI!,
            }),
        })
    );

    // Passport middleware
    app.use(passport.initialize());
    app.use(passport.session());

    // Routes
    app.use("/api", routes);

    return app;
}

export default createApp;
