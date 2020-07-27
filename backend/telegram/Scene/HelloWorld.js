const Scene = require('../Scene')
const WizardScene = require('telegraf/scenes/wizard')

class HelloWorld extends Scene {
  constructor () {
    super('HELLO_WORLD', 'hello')
  }

  /**
   * @param {import('telegraf').Telegraf} bot
   */
  run (bot) {
    return new WizardScene(
      this.stageID,
      /**
       * @param {import('telegraf/typings/context').TelegrafContext} ctx
       */
      async ctx => {
        await ctx.reply('Hello world!')
        return ctx.scene.leave()
      }
    )
  }
}

module.exports = HelloWorld
