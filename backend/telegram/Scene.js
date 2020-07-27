module.exports = class Scene {
  constructor (stageID, commandName) {
    this.stageID = stageID
    this.commandName = commandName
  }

  run (bot) {
    throw new Error('Not implemented')
  }
}
