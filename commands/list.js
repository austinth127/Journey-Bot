export default {
    name: "list",
    description: "Provides a list of all commands.",

    /**
     * @param {DiscordJS.Message<boolean>} message The message from discord
     * @param {Array} args The arguments
     */
    execute(message, args) {
        let commandMap = args.at(0);
        let msg = `List of all commands:`;
        commandMap.forEach((command) => {
            msg += `\r\n\`\`+${command.name}\`\`\r\n${command.description}`;
        });
        msg += ``;
        message.channel.send({
            content: msg,
        });
    },
};
