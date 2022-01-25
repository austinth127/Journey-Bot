import { getVoiceConnection } from "@discordjs/voice";

export default {
    name: "leave",
    description: "This will terminate the voice connection",

    /**
     * @param {DiscordJS.Message<boolean>} message The message from discord
     * @param {Array} args The arguments
     */
    execute(message, args) {
        const channel = message.member.voice.channel;
        if (!channel) {
            message.reply({
                content: "User must be in a channel to play the bot!",
            });
            return;
        }

        const connection = getVoiceConnection(channel.guild.id);
        connection.destroy();
    },
};
