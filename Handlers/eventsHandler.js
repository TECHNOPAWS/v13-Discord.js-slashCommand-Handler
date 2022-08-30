module.exports = {
  run: (client, readdirSync) => {
    //Making an event handler
readdirSync(`${process.cwd()}/Events`).filter(file => file.endsWith(`.js`)).forEach(event => {
  /*
  Note: process.cwd() gives the path to the main file of your project.
  */
  //Making sure that there is a file in the folder.
  if(!event) return;

  //Getting the exported data out of the event file
  let eventFile = require(`${process.cwd()}/Events/${event}`)

  //Make sure that there is a name for the event.
  if(!eventFile.name) throw new Error(`No name has been provided for ${event}`)

  //Execute the event.
  client.on(eventFile.name, (...param) => {
  eventFile.execute({
    client,
    parameter: param
  })
    /*
    Here parameter is the parameter that is associated with the event
    */
  })
})
  }
}