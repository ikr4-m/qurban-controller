const FS = require('fs')
const FlakeID = require('flake-idgen')
const intformat = require('biguint-format')
const URIPath = '/kelompok'

/**
 * @param {import('express').Express} app
 */
module.exports = app => {
  app.post(URIPath, (req, res) => {
    const request = req.query || req.params
    const data = {
      id: intformat(new FlakeID({ epoch: 1595686563739 }).next(), 'dec'),
      nama_kelompok: request.nama_kelompok || undefined,
      panggil: request.panggil || undefined,
      anggota: !request.anggota ? undefined : JSON.parse(request.anggota),
    }
    let valid = true

    data.panggil = data.panggil === 'false' ? false : true // eslint-disable-line
    data.anggota = data.anggota.length === 0 ? undefined : data.anggota
    Object.keys(data).forEach(key => {
      if (typeof data[key] === 'undefined') valid = false
    })

    if (valid) {
      const db = JSON.parse(FS.readFileSync('./database/kelompok.json'))
      db.push(data)
      FS.writeFileSync('./database/kelompok.json', JSON.stringify(db))
    }

    res.status(valid ? 200 : 400).json({
      source: URIPath,
      data: valid === true ? data : {}
    })
  })
}
