import { SlashCommandBuilder } from "discord.js";
export const data = new SlashCommandBuilder()
  .setName("alarm-list")
  .setDescription("設定中のアラームを一覧表示します");

export const devOnly =true;

export async function execute(interaction) {

    const alarms = loadAlarms();

    if (alarms.length === 0) {
        return interaction.reply("アラームはありません");
    }

    let message = "現在のアラーム一覧\n";

    alarms.forEach((alarm, index) => {
        message += `${index + 1}. ${alarm.hour}時${alarm.minute}分\n`;
    });

    await interaction.reply(message);
}
