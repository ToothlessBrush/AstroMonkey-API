import { Router } from "express";
import passport from "passport";
const router = Router();

router.get("/discord", passport.authenticate("discord"), (req, res) => {
    res.send("Logging in with Discord");
});

router.get(
    "/discord/redirect",
    passport.authenticate("discord"),
    (req, res) => {
        res.send("Redirected from Discord");
    }
);

export default router;
