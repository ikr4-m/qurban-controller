const Scene = require('../Scene')
const axios = require('axios').default
const WizardScene = require('telegraf/scenes/wizard')
const Markup = require('telegraf/markup')

class KelompokAdd extends Scene {
  constructor () {
    super('KELOMPOK_ADD', 'add')
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
        await ctx.reply('Masukkan nama kelompok:', Markup.keyboard(['Batal']).resize().extra())
        return ctx.wizard.next()
      },
      /**
       * @param {import('telegraf/typings/context').TelegrafContext} ctx
       */
      async ctx => {
        if (ctx.message.text === 'Batal') {
          await ctx.reply('Permintaan batal dikabulkan.', Markup.removeKeyboard().extra())
          return ctx.scene.leave()
        }
        ctx.wizard.state.namaKelompok = ctx.message.text
        await ctx.replyWithMarkdown(
          'Masukkan nama anggota dalam kelompok ini:\nPisahkan tiap orang dengan baris baru.'
        )
        return ctx.wizard.next()
      },
      /**
       * @param {import('telegraf/typings/context').TelegrafContext} ctx
       */
      async ctx => {
        if (ctx.message.text === 'Batal') {
          await ctx.reply('Permintaan batal dikabulkan.', Markup.removeKeyboard().extra())
          return ctx.scene.leave()
        } else {
          const data = ctx.message.text.split('\n')
          axios(`http://localhost:${process.env.CORE_PORT}/kelompok`, {
            params: {
              nama_kelompok: ctx.wizard.state.namaKelompok,
              anggota: JSON.stringify(data),
              panggil: false
            },
            method: 'POST'
          })
            .then(async res => {
              await ctx.reply('Kelompok berhasil dibuat!', Markup.removeKeyboard().extra())
            })
            .catch(async err => {
              console.log(err)
              await ctx.reply('Sepertinya ada kesalahan dengan server', Markup.removeKeyboard().extra())
            })
          return ctx.scene.leave()
        }
      }
    )
  }
}

module.exports = KelompokAdd
