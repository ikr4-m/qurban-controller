import React, { useState, useEffect } from 'react'
import SocketIO from 'socket.io-client'
import Overlay from './Components/Overlay'
import Marquee from './Components/Marquee'
import Config from './config.json'

const Socket = SocketIO(`http://localhost:3001`)
Socket.on('connect', () => {
  console.log('[SOCKET] Socket successfully handshaked with core!')
})

function App () {
  const [showOverlay, setOverlay] = useState(true)
  const [data, setData] = useState({
    header: '',
    message: '',
    member: []
  })

  // Dapat pesan dari overlay
  useEffect(() => {
    Socket.on('overlay', (msg) => {
      const timeout = msg.type === 'PING'
        ? Config.timeout.ping * 1000
        : Config.timeout.overlay * 1000

      console.log(msg)
      setOverlay(true)
      setData(msg)
      setTimeout(() => {
        setOverlay(false)
        setData({ header: '', message: '', member: [] })
      }, timeout)
    })
  })

  return (
    <div className="App">
      {showOverlay && <Overlay header={data.header} message={data.message} member={data.member} />}
      <Marquee />
    </div>
  )
}

export default App
