const { default: axios } = require('axios')
const URIPath = '/caller'

/**
 * @param {import('express').Express} app
 */
module.exports = app => {
  app.post(URIPath, async (req, res) => {
    const id = req.query.id || undefined

    const request = await axios(`http://localhost:${process.env.CORE_PORT}/kelompok`, {
      params: { id: id },
      method: 'get'
    })
    if (request.data.data.length > 0) {
      const data = request.data.data[0]
      req.io.emit('overlay', {
        header: data.nama_kelompok,
        message: `Perwakilan dari ${data.nama_kelompok} diharapkan untuk memasuki area pemotongan.`,
        name: data.nama_kelompok,
        member: data.anggota,
        type: 'OVERLAY'
      })
    }
  })
}
