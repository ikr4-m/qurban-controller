const path = require('path')
const URIPath = '/ping'

/**
 * @param {import('express').Express} app
 */
module.exports = app => {
  app.post(URIPath, (req, res) => {
    req.io.emit('overlay', {
      header: 'Ping!',
      message: 'Koneksi berhasil!',
      type: 'PING',
      member: []
    })

    res.json({
      source: URIPath,
      status: true
    })
  })
}
