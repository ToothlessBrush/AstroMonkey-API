import { Profile, Strategy } from "passport-discord";
import passport from "passport";
import { VerifyCallback } from "passport-oauth2";
import { IUser, User } from "../database/model/User";

passport.serializeUser((user: any, done) => {
    return done(null, user._id);
});

passport.deserializeUser(async (id: string, done) => {
    try {
        const user = await User.findById(id);
        return user ? done(null, user) : done(null, null);
    } catch (error) {
        return done(error as any, null);
    }
});

passport.use(
    new Strategy(
        {
            clientID: process.env.DISCORD_CLIENT_ID!,
            clientSecret: process.env.DISCORD_CLIENT_SECRET!,
            callbackURL: `${process.env
                .BACKEND_URL!}/api/auth/discord/callback`,
            scope: ["identify", "guilds"],
        },
        async (
            accessToken: string,
            refreshToken: string,
            profile: Profile,
            done: VerifyCallback
        ) => {
            try {
                //check if user exists and update tokens
                const existingUser = await User.findOneAndUpdate(
                    { ID: profile.id },
                    {
                        $set: {
                            "oauthCredentials.accessToken": accessToken,
                            "oauthCredentials.refreshToken": refreshToken,
                        },
                    },
                    { new: true }
                );
                //if user exists, return user
                if (existingUser) {
                    return done(null, existingUser);
                }
                //create new user and save
                const newUser = await User.create({
                    name: profile.username,
                    ID: profile.id,
                    oauthCredentials: { accessToken, refreshToken },
                });
                const savedUser = await newUser.save();
                return done(null, savedUser);
            } catch (error) {
                console.log(error);
                return done(error as any, undefined);
            }
        }
    )
);
