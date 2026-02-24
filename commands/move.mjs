import { SlashCommandBuilder, PermissionFlagsBits, ChannelType } from "discord.js";

export const data = new SlashCommandBuilder()
    .setName("move")
    .setDescription("メンバーを移動させます")
    .addUserOption(option =>
        option
        .setName("member")
        .setDescription("移動させるメンバー")
        .setRequired(true)
    )

    .addChannelOption(option =>
        option
        .setName("channel")
        .setDescription("移動先のチャンネル")
        .addChannelTypes(ChannelType.GuildVoice)
        .setRequired(true)
    )

        export const devOnly = true;

export async function execute(interaction){

    await superjump.voice.setChannel(spawn);

    const bashikko = interaction.user;
    const superjump = interaction.options.getMember("member");
    const start = superjump.voice.channel ? superjump.voice.channel.name : "接続されていません";
    const spawn = Intersection.options.getChannel("channel");

    const logChannel = await interaction.client.channels.fetch(LOG_CHANNEL_ID);

    await logChannel.send(`操作者 : ${bashikko}　移動者 : ${superjump}
    \n転送元 : ${start} → 転送先 : ${spawn}`)

    await interaction.reply({ content:"転送を実行しました", ephemeral:true});
}
