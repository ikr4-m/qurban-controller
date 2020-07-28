import React, { useState } from 'react'
import SocketIO from 'socket.io-client'
import Overlay from './Overlay'

function App () {
  const Socket = SocketIO(`http://localhost:3001`)
  const [showOverlay, setOverlay] = useState(false)

  Socket.on('connect', () => {
    console.log('[SOCKET] Socket successfully handshaked with core!')
  })

  function triggerOverlay (event) {
    event.preventDefault()
    if (showOverlay) setOverlay(false)
    else setOverlay(true)
  }
  return (
    <div className="App">
      <button onClick={triggerOverlay.bind(this)}>Munculkan overlay!</button>
      {showOverlay ? <Overlay /> : null}
    </div>
  )
}

export default App
