import React from 'react'
import '../Sass/main.scss'

function Overlay (props) {
  return (
    <div className='overlay'>
      <div className='container-fluid'>
        <div className='py-2 notification m-auto text-center'>
          {/* Header */}
          <h1 className='mb-2'>
            {props.header || 'overlay.header'}
          </h1>

          {/* Message Overlay */}
          <h6 className='mb-4'>
            {props.message || 'overlay.message'}
          </h6>

          {/* Member */}
          {props.type === 'PING' ? null : (
            <div className='mb-0'>
              <div className='row justify-content-center'>
                {/* <div className="col-2 py-1">Member 1</div> */}
                {props.member.map((member, index) => <div className='col-2 py-1' key={index}> {member} </div>)}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Overlay
