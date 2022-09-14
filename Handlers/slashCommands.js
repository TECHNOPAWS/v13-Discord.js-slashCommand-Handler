const slashCommandArray = [];
// Exporting
module.exports = {
  run: (client, readdirSync) => {
    // Redirecting to the slashCommands folder
    readdirSync(`${process.cwd()}/slashCommands`).forEach((subfolder) => {
      // Make sure that there is a folder.
      if (!subfolder) return;
      // Check if the folder is a file.
      if (subfolder.endsWith(`.js`)) {
        // Assigning another variable to the subfolder for better recognisation.
        const file = subfolder;
        // Getting the json data from the file.
        const command = require(`${process.cwd()}/slashCommands/${file}`);

        // Throw an error if there is no slash command detected in the file
        if (!command.data.name || !command.data.description) throw new Error(`Slash commands not properly configured for ${file}. Missing property: ${!command.data.name ? `Name` : `Description`}`);

        // Make sure that the command has a run property
        if (!command.run) throw new Error(`Slash commands not properly configured for ${file}. Missing property: run`);
        // Pushing the command to an array
        slashCommandArray.push(command);
        // Adding the command to the collection
        client.slashCommands.set(command.data.name, command);
      }
      else {
        readdirSync(`${process.cwd()}/slashCommands/${subfolder}`).filter((file) => file.endsWith(`.js`)).forEach((file) => {
          // Make sure that there is a file.
          if (!file) return;
          // Getting json data from the file.
          const command = require(`${process.cwd()}/slashCommands/${subfolder}/${file}`);
          // Throw an error if there is no slash command detected in the file
          if (!command.data.name || !command.data.description) throw new Error(`Slash commands not properly configured for ${file}. Missing property: ${!command.data.name ? `Name` : `Description`}`);

          // Make sure that the command has a run property
          if (!command.run) throw new Error(`Slash commands not properly configured for ${file}. Missing property: run`);
          // Push the command into an array
          slashCommandArray.push(command);
          // Set the slash command into a collection
          client.slashCommands.set(command.data.name, command);
        });
      }
    });
  },
  commands: slashCommandArray,
};