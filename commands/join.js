import { joinVoiceChannel, VoiceConnectionStatus } from "@discordjs/voice";

export default {
    name: "join",
    description: "This will join the user's voice channel",

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

        const connection = joinVoiceChannel({
            channelId: channel.id,
            guildId: channel.guild.id,
            adapterCreator: channel.guild.voiceAdapterCreator,
        });

        connection.on(VoiceConnectionStatus.Ready, () => {
            console.log(
                "The connection has entered the Ready state - ready to play audio!"
            );
        });
    },
};
