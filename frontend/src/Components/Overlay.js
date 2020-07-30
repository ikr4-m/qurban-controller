import React from 'react'
import '../Sass/main.scss'

function Overlay (props) {
  return (
    <div className='overlay'>
      <div className='container-fluid'>
        <div className='py-2 notification m-auto text-center'>
          <h1 className='mb-2'>
            {props.header || 'overlay.header'}
          </h1>
          <h6 className='mb-4'>
            {props.message || 'overlay.message'}
          </h6>
          <p className='mb-0'>
            {props.member.length === 0 ? 'overlay.member' : props.member}
          </p>
        </div>
      </div>
    </div>
  )
}

export default Overlay
