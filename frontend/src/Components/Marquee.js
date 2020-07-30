import React, { useState } from 'react'
import useInterval from './useInterval'

function Marquee (props) {
  const [time, setTime] = useState(new Date())
  const [kelompok, setKelompok] = useState({
    mode: 'OVERVIEW',
    text: props.namaKelompok === '' || !props.namaKelompok ? 'Belum dipanggil' : props.namaKelompok
  })

  // Atur interval jam
  useInterval(() => setTime(new Date()), 1000)

  // Atur kelompok
  useInterval(() => {
    if (kelompok.mode === 'OVERVIEW') {
      setKelompok({ mode: 'OVERLAY', text: 'Kelompok saat ini:' })
    } else {
      setKelompok({
        mode: 'OVERVIEW',
        text: props.namaKelompok === '' || !props.namaKelompok ? 'Belum dipanggil' : props.namaKelompok
      })
    }
  }, 2000)

  return (
    <div className='mb-0 fixed-bottom w-100'>
      <div className="row">
        <div className="col-5 p-2 marquee-1">
          {/* eslint-disable */}
          <marquee>
            {props.anggotaKelompok.length > 0 ? `${props.namaKelompok}: ${props.anggotaKelompok.join(' | ')}` : <span>Belum ada anggota</span>}
          </marquee>
          {/* eslint-enable */}
        </div>
        <div className="col-1 p-2 text-center marquee-2">
          {kelompok.text}
        </div>
      </div>

      <div className="row">
        {/* Pesan penting */}
        <div className="col-5 p-2 marquee marquee-3">
          {/* eslint-disable */}
          <marquee>
            {props.message.join(' | ')}
          </marquee>
          {/* eslint-enable */}
        </div>
        {/* Jam */}
        <div className="col-1 p-2 text-center marquee-4">
          {time.toLocaleTimeString()}
        </div>
      </div>
    </div>
  )
}

export default Marquee
