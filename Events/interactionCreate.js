// Destructure readdirSync from fs
const { readdirSync } = require(`fs`);

// Importing node-fetch module
const fetch = require(`node-fetch`);

// Exporting
module.exports = {
  name: `interactionCreate`,
  async execute({ client, parameter: [interaction] }) {

    // Find the name of the slashCommand in the collection
    const getCommand = client.slashCommands.find(cmd => cmd.data.name === interaction.commandName);

    // Delete the command if its not found
    if (!getCommand) {
      await interaction.reply({
        content: `This command doesn't exist and will be deleted`,
        ephemeral: true,
      });

      return await fetch(`https://discord.com/api/v9/applications/${client.user.id}/commands/${interaction.commandID}`, {
        method: `DELETE`,
        header: {
          authorization: `Bot ${client.token}`,
        },
      });
    }

    // Add a run function to the command
    getCommand.run(client, interaction);

  },
};
