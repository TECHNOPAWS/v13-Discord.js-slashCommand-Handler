//Destructering a slashCommandBuilder from @discordjs/builders
const { SlashCommandBuilder } = require(`@discordjs/builders`)

module.exports = {
  data: new SlashCommandBuilder()
    .setName(`ping`) //Setting a name to our command
    .setDescription(`Replies with bot ping`),//Giving it a description
  async run(client,interaction){//Adding the run function.
    await interaction.reply(`:ping_pong: Pong\n\`${client.ws.ping}ms\` latency.`) //Replying with client ping.
  }
}