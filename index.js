//Destructure Client and Collection from discord.js
const { Client, Collection } = require(`discord.js`);
//Destructure readdirSync from fs
const { readdirSync } = require(`fs`)
//Create a new client
const client = new Client({
  intents: [`GUILDS`,`GUILD_MESSAGES`,`GUILD_MEMBERS`]
})
/*
If the above line errors with
`Error [DISALLOWED_INTENTS]...`
Go to https://discord.com/developers and click on your application, then go to bot section and enable both the priviledged intents.
*/

//Declare a new collection for slashCommands.
client.slashCommands = new Collection()
//----------------------------------------

//Making a handler for our handlers :troll: (I know it sounds weird~)
readdirSync(`${process.cwd()}/Handlers`).forEach(handler => {
  if(!handler) return;
  let Handler = require(`${process.cwd()}/Handlers/${handler}`)

  Handler.run(client, readdirSync)
})

//-----------------------------------------

//Log in the client
client.login(process.env[`BOT_TOKEN`])
/*
You can put your bot token instead of `process.env.BOT_TOKEN` or add it in your .env folder with the format:
BOT_TOKEN=bot's-token
*/