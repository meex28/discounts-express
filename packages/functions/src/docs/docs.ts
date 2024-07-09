import { readFile } from "fs/promises";
import { ApiHandler } from "sst/node/api";

export const handler = ApiHandler(async () => {
    const file = await readFile("packages/functions/src/docs/open-api.html", { encoding: "utf-8" });
    const maxAge = 10;
    return {
        statusCode: 200,
        body: file,
        headers: {
            "Content-Type": "text/html",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Max-Age": maxAge,
            "Cache-Control": `public, must-revalidate, s-maxage=${maxAge}, max-age=${maxAge}`,
            "x-access-token": true,
        },
    };
});