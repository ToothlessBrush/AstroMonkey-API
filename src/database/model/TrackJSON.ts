/**
 * TrackJSON type from discord-player
 */
export interface TrackJSON {
    /**
     * The track id
     */
    id: string;
    /**
     * The track title
     */
    title: string;
    /**
     * The track description
     */
    description: string;
    /**
     * The track author
     */
    author: string;
    /**
     * The track url
     */
    url: string;
    /**
     * The track thumbnail
     */
    thumbnail: string;
    /**
     * The track duration
     */
    duration: string;
    /**
     * The track duration in ms
     */
    durationMS: number;
    /**
     * The track views
     */
    views: number;
    /**
     * The user id who requested this track
     */
    requestedBy: string;
}
