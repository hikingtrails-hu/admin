import { config } from "dotenv";
config({
    path: `${__dirname}/../../../.env`
})

import { run } from "~/cli/cli.server";


void run()
