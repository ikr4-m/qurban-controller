import React from 'react'

function Marquee (props) {
  return (
    <div className='mb-0 fixed-bottom w-100'>
      <div className="row">
        <div className="col-5 p-2 marquee-1">
          Marquee 1
        </div>
        <div className="col-1 p-2 marquee-2">
          Marquee 2
        </div>
      </div>
      <div className="row">
        <div className="col-5 p-2 marquee-3">
          Marquee 3
        </div>
        <div className="col-1 p-2 marquee-4">
          Marquee 4
        </div>
      </div>
    </div>
  )
}

export default Marquee
