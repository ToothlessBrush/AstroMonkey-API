import { config } from "dotenv";
import "./database";
config();

import createApp from "./utils/createApp";

const port = process.env.PORT || 3001;

async function main() {
    console.log(`Running on ${process.env.NODE_ENV} mode`);

    try {
        const app = createApp();

        app.listen(port, () => console.log(`Server running on port ${port}`));
    } catch (error) {
        console.error(error);
    }
}

main();
