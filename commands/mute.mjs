import { SlashCommandBuilder, PermissionFlagsBits, ChannelType } from "discord.js";

export const data = new SlashCommandBuilder()
    .setName("mute")
    .setDescription("ミュートに設定/解除します")
    .addUserOption(option =>
        option
        .setName("member")
        .setDescription("設定/解除させるメンバー")
        .setRequired(true)
    )

    export const devOnly = true;

export async function execute(interaction){

    const bashikko = interaction.user;
    const superjump = interaction.options.getMember("member");
    const start = superjump.voice.channel ? superjump.voice.channel.name : "接続されていません";
    const spawn = Intersection.options.getChannel("channel");

    const logChannel = await interaction.client.channels.fetch(LOG_CHANNEL_ID);

    await interaction.reply(`${bashikko}が${superjump}をミュートに設定/解除しました。`)

    ({ content:"転送を実行しました", ephemeral:true});
}
