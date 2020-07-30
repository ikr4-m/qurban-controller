const Scene = require('../Scene')
const Markup = require('telegraf/markup')
const WizardScene = require('telegraf/scenes/wizard')
const { default: axios } = require('axios')

class Caller extends Scene {
  constructor () {
    super('CALLER', 'call')
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
        ctx.wizard.state.data = await this.fetchAllMember()
        ctx.wizard.state.kelompok = {}
        const markup = []
        
        ctx.wizard.state.data.forEach(data => {
          if (data.panggil) return
          markup.push([`${data.id} # ${data.nama_kelompok}`])
        })

        if (markup.length === 0) {
          await ctx.reply('Tidak ada kelompok yang dapat dipanggil.')
          return ctx.scene.leave()
        } else {
          await ctx.reply(
            'Silahkan pilih kelompok yang akan di panggil:',
            Markup.keyboard(markup).resize().oneTime().extra()
          )
          return ctx.wizard.next()
        }
      },
      /**
       * @param {import('telegraf/typings/context').TelegrafContext} ctx
       */
      async ctx => {
        const divider = ctx.message.text.split(' # ')
        ctx.wizard.state.kelompok.id = divider[0]
        ctx.wizard.state.kelompok.nama = divider[1]

        axios(`http://localhost:${process.env.CORE_PORT}/caller`, {
          method: 'POST',
          params: {
            id: ctx.wizard.state.kelompok.id
          }
        })
          .catch(async err => {
            console.log(err)
            await ctx.reply('Sepertinya ada kesalahan dengan server')
          })
        await ctx.replyWithMarkdown(
          `Anda memanggil *${ctx.wizard.state.kelompok.nama}*.`,
          Markup.removeKeyboard().extra()
        )
        return ctx.scene.leave()
      }
    )
  }

  async fetchAllMember () {
    const data = await axios(`http://localhost:${process.env.CORE_PORT}/kelompok`)
    if (!data) return []
    return data.data.data
  }
}

module.exports = Caller
