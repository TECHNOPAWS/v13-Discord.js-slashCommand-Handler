//Import the colors npm package.
require(`colors`)

//Get the commands list from slashCommands.js file
const { commands } = require(`../Handlers/slashCommands.js`)

//Requiring node-fetch with the variable fetch.
const fetch = require(`node-fetch`)

//Check whether commands should be registered globally or not. (**This can be toggled from the config.json file by changing the value of isGlobal to false**)
const { isGlobal, testGuildId } = require(`${process.cwd()}/config.json`)

//Import chalk


//Exporting
module.exports = {
  name: `ready`,
  async execute({ client, parameter: [] }) {

    //Log that our client is ready when its logged in
    console.log(`Logged in as ${client.user.tag}`.red)

    //Check if there are any slash commands.
    if (!commands[0]) return;

    //--Start registering slash commands--
    console.log(`Started registering (/) application commands.`.blue.bold.italic)

    // Map the collection with json data
      let slashCommand = client.slashCommands.map((m) => m.data.toJSON())

    //Check if the slashCommands must be registered globally or not.
    if (isGlobal) {
      
      //Register the command with a json request
      let globalRegister = await fetch(`https://discord.com/api/v9/applications/${client.user.id}/commands`, {
        method: `PUT`,
        headers: {
          authorization: `Bot ${client.token}`,
          "Content-type": `application/json`,
        },
        body: JSON.stringify(slashCommand)
      })

      //If successful, log the results
      if (globalRegister.status === 200) {
        console.log(`Registered ${commands.length} (/) application commands globaly.`.magenta.bold.italic)
      } else {
        //Otherwise, log the error
        console.log((await globalRegister.json()).errors)
      }
    } else {
      //If not global, then register the command to a guild
     let guildRegister = await fetch(`https://discord.com/api/v9/applications/${client.user.id}/guilds/${testGuildId}/commands`, {
        method: `PUT`,
        headers: {
          authorization: `Bot ${client.token}`,
            "Content-type": `application/json`
        },
        body: JSON.stringify(slashCommand)
      })

      //If successful, then log the data to console
      if(guildRegister.status === 200){
        console.log(`Registered ${commands.length} (/) application commands locally.`.magenta.bold.italic)
      } else {
        //Otherwise, log the error.
        console.log((await guildRegister.json()).errors)
      }
    }
  }
}