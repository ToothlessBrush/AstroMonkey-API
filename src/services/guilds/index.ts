import axios from "axios";
import { User } from "../../database/model/User";
import { DISCORD_API_URL } from "../../utils/constants";
import { PartialGuild } from "../../utils/types";

export function getBotGuildsServices() {
    return axios.get<PartialGuild[]>(`${DISCORD_API_URL}/users/@me/guilds`, {
        headers: { Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}` },
    });
}

export async function getUserGuildsServices(id: string) {
    const user = await User.findById(id);
    if (!user) throw new Error("User not found");
    return axios.get<PartialGuild[]>(`${DISCORD_API_URL}/users/@me/guilds`, {
        headers: {
            Authorization: `Bearer ${user.oauthCredentials.accessToken}`,
        },
    });
}

export async function getMutualGuildsServices(
    id: string
): Promise<PartialGuild[]> {
    const { data: botGuilds } = await getBotGuildsServices();
    const { data: userGuilds } = await getUserGuildsServices(id);
    //filter for mutual guilds
    const mutualGuilds = botGuilds.filter((botGuild) =>
        userGuilds.some((userGuild) => userGuild.id === botGuild.id)
    );

    return mutualGuilds;
}
