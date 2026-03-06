import { SlashCommandBuilder, PermissionFlagsBits, ChannelType } from "discord.js";
import { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } from "@discordjs/voice";

export const data = new SlashCommandBuilder()
    .setName("alarm")
    .setDescription("アラームをセットします")
    .addIntegerOption(option =>
        option
        .setName("hour")
        .setDescription("時(0~23)")
        .setMinValue(0)
        .setMaxValue(23)
        .setRequired(true)
    )

    .addIntegerOption(option =>
        option
        .setName("minute")
        .setDescription("分(0~59)")
        .setMinValue(0)
        .setMaxValue(59)
        .setRequired(true)
    );

export const devOnly = true;

export async function execute(interaction){
    const hour = interaction.options.getInteger("hour");
    const minute = interaction.options.getInteger("minute");

    const now = new Date();
    const target = new Date();

    await interaction.reply({
        content: `${hour}時${minute}分に実行します`,
        ephemeral: true
    });

    target.setHours(hour, minute, 0, 0);

    if (target <= now) {
    target.setDate(target.getDate() + 1);
    }

    const delay = target - now;
    
  　setTimeout(async () => {
    const guild = await client.guilds.fetch(alarm.guildId);
    const vc = await guild.channels.fetch(alarm.voiceChannelId);
    }
              
    const voiceChannel = interaction.member.voice.channel;
    if(!voiceChannel){
        return interaction.reply({
            content:"先にVCに接続してください"
            ephemeral:true
        });
    }
}

    client.once("ready", () => {
    const alarms = loadAlarms();
    for (const alarm of alarms) {
    scheduleAlarm(alarm, client);
  }
  console.log("アラーム復元完了");
});


function playSound(voiceChannel, file) {
    const connection = joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: voiceChannel.guild.id,
        adapterCreator: voiceChannel.guild.voiceAdapterCreator,
    });
    
    const player = createAudioPlayer();
    const resource = createAudioResource(`sounds/${file}`);

    connection.subscribe(player);
    player.play(resource);

    player.on(AudioPlayerStatus.Idle, () => {
        connection.destroy();
    });
}












