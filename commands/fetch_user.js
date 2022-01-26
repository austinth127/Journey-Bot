import { githubAuth } from "../config.js";
import { Octokit } from "@octokit/rest";

export default {
    name: "fetch_user",
    description:
        "Fetches a given user from github, passed as a plaintext argument of the username.",
    arguments: ["username"],

    /**
     * @param {DiscordJS.Message<boolean>} message The message from discord
     * @param {Array} args The arguments
     */
    execute(message, args) {
        let msgContent = decipherMessage(message, args);
        message.channel.send({
            content: msgContent,
        });

        if (args.length === 1) {
            let user = args.at(0);
            getUser(user).then((userObj) => {
                console.log(userObj);
                if (userObj != null) {
                    msgContent = `${userObj.data.html_url}\nName: ${userObj.data.name}\nUsername: ${userObj.data.login}`;
                } else {
                    msgContent = `The specified user can not be found.`;
                }
                message.channel.send({
                    content: msgContent,
                });
                return;
            });
        }
    },
};

async function getUser(user) {
    let found = true;
    const octokit = new Octokit({
        auth: githubAuth,
        userAgent: "Journey Bot v1.0.0",
    });

    const userData = await octokit.rest.users
        .getByUsername({
            username: user,
        })
        .catch((e) => {
            console.log("Cannot find desired user: " + user);
            found = false;
        });

    if (!found) {
        return null;
    } else {
        return userData;
    }
}

function decipherMessage(message, args) {
    let msgContent;

    if (args.length === 1) {
        let user = args.at(0);
        msgContent = `Fetching github for user "${user}"...\n`;
    } else if (args.length > 1) {
        msgContent = "Too many arguments, please type only a single username.";
    } else {
        msgContent = "Please provide a username.";
    }
    return msgContent;
}
