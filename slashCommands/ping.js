// destructuring a slashCommandBuilder from @discordjs/builders
const { SlashCommandBuilder } = require(`@discordjs/builders`);

module.exports = {
  // Giving our command a name and description
  data: new SlashCommandBuilder()
    .setName(`ping`)
    .setDescription(`Replies with bot ping`),
  // Adding the run function.
  async run(client, interaction) {
    // Replying with client ping.
    await interaction.reply(`:ping_pong: Pong\n\`${client.ws.ping}ms\` latency.`);
  },
};