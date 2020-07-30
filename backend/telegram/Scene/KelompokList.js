const Scene = require('../Scene')
const axios = require('axios').default
const WizardScene = require('telegraf/scenes/wizard')

class KelompokList extends Scene {
  constructor () {
    super('KELOMPOK_LIST', 'list')
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
        const args = ctx.message.text.split(' ').slice(1)
        if (args.length === 0) {
          await axios.get(`http://localhost:${process.env.CORE_PORT}/kelompok`)
            .then(async res => {
              const data = res.data.data
              let index = 1
              let stringify = ''
              if (data.length < 1) {
                stringify = 'Masih kosong.\n'
              } else {
                data.forEach(da => {
                  stringify += `${index}. ${da.nama_kelompok} (ID:${da.id})\n`
                  index++
                })
              }
              await ctx.replyWithMarkdown(
                `*[LIST KELOMPOK]*\n\n${stringify}\nJumlah Kelompok: ${data.length}`
              )
            })
            .catch(async err => {
              console.log(err)
              await ctx.reply('Sepertinya ada kesalahan dengan server.')
            })
        } else {
          await axios.get(`http://localhost:${process.env.CORE_PORT}/kelompok`, {
            params: {
              id: args[0]
            }
          })
            .then(async res => {
              const data = res.data.data
              if (data.length === 0) {
                await ctx.reply('ID tidak ditemukan.')
                return ctx.scene.leave()
              }

              const rData = data[0]
              await ctx.replyWithMarkdown(
                `*[LIST KELOMPOK]*\n\nID: ${rData.id}\nNama Kelompok: ${rData.nama_kelompok}\n` + 
                `Anggota:\n- ${rData.anggota.join('\n- ')}`
              )
            })
            .catch(async err => {
              console.log(err)
              await ctx.reply('Sepertinya ada kesalahan dengan server.')
            })
        }
        return ctx.scene.leave()
      }
    )
  }
}

module.exports = KelompokList
