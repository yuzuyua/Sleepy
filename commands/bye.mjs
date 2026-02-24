import { SlashCommandBuilder, PermissionFlagsBits, ChannelType } from "discord.js";

export const data = new SlashCommandBuilder()
    .setName("bye")
    .setDescription("メンバーをVCから切断します")
    .addUserOption(option =>
        option
        .setName("s_member")
        .setDescription("メンバーを指定")
        .setRequired(true)
    )

export const devOnly = true;

export async function execute(interaction){

    const shibakitai = interaction.user;
    const superjump = interaction.options.getMember("s_member");
    const start = superjump.voice.channel ? superjump.voice.channel.name : "そのユーザーはVCに接続されていません";
    
    await superjump.voice.setChannel(null);

    await logChannel.send(`${shibakitai}が${superjump}を${start}から切断しました}`)

    await interaction. reply({ content:"切断を実行しました", ephemeral:true});
}
