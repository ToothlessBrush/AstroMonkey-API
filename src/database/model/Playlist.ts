import { TrackJSON } from "./TrackJSON";
import mongoose, { Schema, ObjectId } from "mongoose";

interface IPlaylist {
    name: string;
    creater: {
        name: string;
        ID: string;
    };
    length?: number;
    duration?: number;
    dateCreated?: Date;
    tracks: TrackJSON[];
    _id?: mongoose.Types.ObjectId;
}

const playlistSchema = new Schema<IPlaylist>({
    name: String,
    creater: {
        name: String,
        ID: String,
    },
    length: Number,
    duration: Number,
    dateCreated: { type: Date, default: Date.now },
    tracks: [Schema.Types.Mixed],
    _id: Schema.Types.ObjectId,
});

export { playlistSchema, IPlaylist };
