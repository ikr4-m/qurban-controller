const { Telegraf } = require('telegraf')
const Stage = require('telegraf/stage')
const session = require('telegraf/session')
const FS = require('fs')

const bot = new Telegraf(process.env.TELEGRAM_TOKEN)
const StageMap = new Map()
const StageArray = []
FS.readdir('./telegram/Scene', (err, scenes) => {
  if (err) throw err

  scenes.forEach(scene => {
    const _sc = require(`./Scene/${scene}`)
    const sc = new _sc()
    StageMap.set(sc.stageID, sc.commandName)
    StageArray.push(sc.run(bot))
  })

  const stage = new Stage(StageArray)
  bot.use(session())
  bot.use(stage.middleware())
  StageMap.forEach((val, key) => {
    bot.command(val, Stage.enter(key))
  })
})

bot.launch().then(() => {
  console.log('Telegram bot successfully launched!')
})
