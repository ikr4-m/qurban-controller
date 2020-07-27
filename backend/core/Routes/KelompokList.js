const FS = require('fs')
const lodash = require('lodash')
const URIPath = '/kelompok'

/**
 * @param {import('express').Express} app
 */
module.exports = app => {
  app.get(URIPath, (req, res) => {
    const id = req.query.id
    const data = JSON.parse(FS.readFileSync('./database/kelompok.json'))
    let ret = []

    if (!id) {
      ret = data
    } else {
      ret = lodash(data).filter(da => da.id === id).slice(0, 1).value()
    }

    res.json({
      source: URIPath,
      data: ret
    })
  })
}
