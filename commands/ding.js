export default {
    name: "ding",
    description: "I am a bell :D .",

    /**
     * @param {DiscordJS.Message<boolean>} message The message from discord
     * @param {Array} args The arguments
     */
    execute(message, args) {
        message.reply({
            content: "Dong!",
        });
    },
};
