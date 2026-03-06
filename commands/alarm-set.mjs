import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('alarm-set')
  .setDescription('アラームをセットします')
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
    )
    .addIntegerOption(option =>
        option
        .setName("sound")
        .setDescription("再生する音")
        .setRequired(false)
    );

export const devOnly = true;

export async function execute(interaction) {
  const hour = interaction.options.getInteger("hour")
  const minute = interaction.options.getInteger("minute")
  const sound = interaction.options.getString("sound");

  const vc = interaction.member.voice.channel;
  if (!vc) {
    return interaction.reply({ content: "先にVCに入ってから操作してください", ephemeral: true });
  }

  const now = new Date();
  const target = new Date();
  target.setHours(hour, minute, 0, 0);
  if (target <= now) target.setDate(target.getDate() + 1);

  const alarm = {
    id: crypto.randomUUID(),
    guildId: interaction.guildId,
    channelId: interaction.channelId,
    voiceChannelId: vc.id,
    executeAt: target.getTime(),
    sound,
  };

  const alarms = loadAlarms();
  alarms.push(alarm);
  saveAlarms(alarms);

  scheduleAlarm(alarm, interaction.client);

  await interaction.reply({
    content: `${hour}時${minute}分にアラームをセットしました（ID:${alarm.id}）`,
    ephemeral: true,
  });
}
