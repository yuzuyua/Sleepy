import { SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("alarm-remove")
  .setDescription("アラームを削除します")
  .addIntegerOption(option =>
    option
        .setName("number")
        .setDescription("削除するアラーム番号")
        .setRequired(true)
)
export const devOnly = true;

export async function execute(interaction){
  const number = interaction.options.getInteger("number");
  const alarms = loadAlarms();

  if (number < 1 || number > alarms.length) {
    return interaction.reply("その番号のアラームはありません");
  }

  const removed = alarms.splice(number - 1, 1);

  saveAlarms(alarms);

  await interaction.reply(`${removed[0].hour}時${removed[0].minute}分のアラームを削除しました`);
