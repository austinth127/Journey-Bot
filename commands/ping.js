export default {
    name: "ping",
    description: "This is a ping command!",

    /**
     * @param {DiscordJS.Message<boolean>} message The message from discord
     * @param {Array} args The arguments
     */
    execute(message, args) {
        message.reply({
            content: "Pong!",
        });
    },
};
