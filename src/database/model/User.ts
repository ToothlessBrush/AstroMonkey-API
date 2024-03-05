import { Schema, model, Document, ObjectId } from "mongoose";
import { playlistSchema, IPlaylist } from "./Playlist";
import { TrackJSON } from "./TrackJSON";

interface IUser extends Document {
    _id: string;
    name: string;
    ID: string;
    likes: TrackJSON[];
    playlists: IPlaylist[];
    oauthCredentials: {
        accessToken: string;
        refreshToken: string;
    };
    timestamps: {
        createdAt: Date;
        updatedAt: Date;
    };
}

const userSchema = new Schema<IUser>(
    {
        name: String,
        ID: String,
        likes: [Schema.Types.Mixed],
        playlists: [playlistSchema],
        oauthCredentials: {
            accessToken: String,
            refreshToken: String,
        },
    },
    {
        timestamps: {
            createdAt: "createdAt",
            updatedAt: "updatedAt",
        },
    }
);

userSchema.pre(`save`, function () {
    console.log(`Saved User Document`);
});

//updated updatedAt whenever .findOne is called //queries are strict
// userSchema.pre("findOne", function (next) {
//     // Attach a post-find hook to the query to update 'updatedAt'
//     console.log(`finding one document on mongodb`)
//     this.set({}, { $set: { updatedAt: new Date() } }).then(() => next())
// })

const User = model<IUser>("User", userSchema);

export { User, IUser };
