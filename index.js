import DiscordJS, { Intents } from "discord.js";
import { token } from "./config.js";
import * as fs from "fs";

// Initialize our client as a DiscordJS client and declare intents
const client = new DiscordJS.Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

// Prefix that our bot will use for commands
const prefix = "+";

// Initialize a new collection to hold our commands, behaves as a map
client.commands = new DiscordJS.Collection();

// Load all the files and add to our collection from each file
loadCommands();

// Declare status as online
client.once("ready", () => {
    console.log("Online!");
});

client.on("messageCreate", (message) => {
    // Ensure message origin starts with prefix and does not originate from a bot
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    // Get command name and arguments
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    // DEBUG: Resolve message origin and data
    console.log("Command Received in: " + message.guild);
    console.log({ command, args });

    if (command === "list") {
        args.unshift(client.commands);
    }

    // Resolve command message
    if (client.commands.has(command)) {
        client.commands.get(command).execute(message, args);
    } else {
        message.reply({
            content:
                "Invalid Command: type ``+list`` for a list of valid commands.",
        });
    }
});

// Login to client
client.login(token);

/*
 * loadCommands
 *
 * This function loads the commands in the local commands folder and outputs
 * results to the console on startup.
 *
 */
function loadCommands() {
    console.log("\n");
    console.log("Loading commands: ", "\n");
    const commandFiles = fs.readdir("./commands/", (err, files) => {
        files.forEach(async (file) => {
            console.log("File: " + file.toString());
            const command = await import("./commands/" + file);
            console.log(command.default, "\n");
            client.commands.set(command.default.name, command.default);
        });
    });
}
