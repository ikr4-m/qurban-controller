import React from 'react'

function Overlay (props) {
  return (
    <div className='overlay'>
      <div className='container-fluid d-flex flex-column' style={{ height: '100vh' }}>
        <div className='p-5 m-auto text-center'>
          <p>
            {props.header || 'overlay.header'}
          </p>
          <p>
            {props.message || 'overlay.message'}
          </p>
          <p>
            {props.member.length === 0 ? 'overlay.member' : props.member}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Overlay
