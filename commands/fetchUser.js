import { githubAuth } from "../config.js";
import { Octokit } from "@octokit/rest";

export default {
    name: "fetchUser",
    description:
        "Fetches a given user from github, passed as a plaintext argument of the username.",
    arguments: ["username"],

    /**
     * @param {DiscordJS.Message<boolean>} message The message from discord
     * @param {Array} args The arguments
     */
    execute(message, args) {
        message.reply({
            content: "Fetching github profile...",
        });

        let octokit = instantiate();
    },
};

function instantiate() {
    const octokit = new Octokit({
        auth: githubAuth,
        userAgent: "Journey Bot v1.0.0",
    });

    return octokit;
}
