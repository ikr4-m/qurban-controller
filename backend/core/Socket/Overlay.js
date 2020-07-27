/**
 * @param {import('socket.io').Socket} socket
 */
module.exports = (socket) => {
  socket.on('overlay', (data) => {
    console.log(data)
  })
}
