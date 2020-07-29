const Scene = require('../Scene')
const { default: axios } = require('axios')
const WizardScene = require('telegraf/scenes/wizard')

class HelloWorld extends Scene {
  constructor () {
    super('OVERLAY_PING', 'ping')
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
        await axios.post(`http://localhost:${process.env.CORE_PORT}/ping`)
          .then(async res => {
            const status = res.data.status
            status ? await ctx.reply('Ping berhasil dikirim!') : await ctx.reply('Ada kesalahan yang terjadi, silahkan cek konsol.')
          })
          .catch(async err => {
            console.log(err)
            await ctx.reply('Sepertinya ada kesalahan dengan server.')
          })
        return ctx.scene.leave()
      }
    )
  }
}

module.exports = HelloWorld
