//Import the colors npm package.
require(`colors`)

//Get the commands list from slashCommands.js file
const { commands } = require(`../Handlers/slashCommands.js`)

//Requiring node-fetch with the variable fetch.
const fetch = require(`node-fetch`)

//Check whether commands should be registered globally or not. (**This can be toggled from the config.json file by changing the value of isGlobal to false**)
const { isGlobal, guildId } = require(`${process.cwd()}/config.json`)

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
        //Otherwise, log the result
        console.log((await globalRegister.json()))
      }
    } else {
      //If not global, then register the command to a guild
      let guildRegister = await fetch(`https://discord.com/api/v9/applications/${client.user.id}/guilds/${guildId}/commands`, {
        method: `PUT`,
        headers: {
          authorization: `Bot ${client.token}`,
          "Content-type": `application/json`
        },
        body: JSON.stringify(slashCommand)
      })

      //If successful, then log the data to console
      if (guildRegister.status === 200) {
      console.log(`Registered ${commands.length} (/) application commands locally.`.magenta.bold.italic)
      }
        //Log that there is no permission to register slashCommands to that guild if there isn't.
      else if ((await guildRegister.json()).hasOwnPreprty(`message`) && (await guildRegister.json()).message.startsWith(`Missing Access`)) {
        return console.log(`The bot is not registered to ${(await client.guilds.fetch(guildId)).name ?? `Unkown guild`} with application.commands intent, please use https://discord.com/oauth2/authorize?client_id=${client.user.id}&scope=bot applications.commands&guild_id=${guildId} to re-invite it`)
      } else {
        //Otherwise, result.
        console.log((await guildRegister.json()).errors)
      }
    }
  }
}