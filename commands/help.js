export default {
    name: "help",
    description: "Provides the description of a given command.",
    arguments: ["command"],

    /**
     * @param {DiscordJS.Message<boolean>} message The message from discord
     * @param {Array} args The arguments
     */
    execute(message, args) {
        let msgContent = decipherMessage(message, args);
        message.channel.send({
            content: msgContent,
        });
    },
};

async function resolveCommand(args) {
    const command = await import(`./${args}.js`);
    const message = `\`\`\`Name: ${command.default.name}\r\nDescription: ${
        command.default.description
    }\r\nArguments: ${
        command.default.arguments ? command.default.arguments : "None"
    }\`\`\``;
    return message;
}

function decipherMessage(message, args) {
    let msgContent;
    if (args.length === 1) {
        if (message.client.commands.has(args.at(0))) {
            msgContent = `Displaying help for command: \`\`${args}\`\`\n`;
            resolveCommand(args).then((msg) => {
                message.channel.send({
                    content: msg,
                });
                return;
            });
        } else {
            msgContent = `There is no command: \`\`${args}\`\``;
        }
    } else if (args.length > 1) {
        msgContent =
            "Too many arguments, please type only a single command name.";
    } else {
        msgContent =
            "Please provide a specific command to receive help on. For a full list of commands, please type ``+list``";
    }
    return msgContent;
}
