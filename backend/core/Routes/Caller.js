const path = require('path')
const URIPath = '/caller'

/**
 * @param {import('express').Express} app
 */
module.exports = app => {
  app.post(URIPath, (req, res) => {
    const id = req.query.id || undefined
  })
}
