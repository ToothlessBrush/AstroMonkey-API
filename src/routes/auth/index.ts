import { Router } from "express";
import passport from "passport";
const router = Router();

router.get("/discord", passport.authenticate("discord"), (req, res) => {
    res.sendStatus(200);
});

router.get(
    "/discord/callback",
    passport.authenticate("discord", { failureRedirect: "/" }),
    (req, res) => {
        //res.sendStatus(200);
        res.redirect(process.env.FRONTEND_URL! + "/dashboard");
    }
);

export default router;
