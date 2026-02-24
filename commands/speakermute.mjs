import { SlashCommandBuilder, PermissionFlagsBits, ChannelType } from "discord.js";

export const data = new SlashCommandBuilder()
    .setName("speakermute")
    .setDescription("スピーカーミュートを設定/解除します")
    .addUserOption(option =>
        option
        .setName("sm_member")
        .setDescription("設定/解除するメンバー")
        .setRequired(true)
    )

        export const devOnly = true;

export async function execute(interaction){

    const player = interaction.user;
    const suyapi = interaction.options.getMember("sm_member");

    const logChannel = await interaction.client.channels.fetch(LOG_CHANNEL_ID);

    await logChannel.send (`サーバーミュート操作\n操作者 : ${player}\n被設定者 :${suyapi});

    await interaction.reply(`${player}が${suyapi}をスピーカーミュートに設定しました。`)
}