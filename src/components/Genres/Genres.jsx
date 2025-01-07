import React from 'react'
import Marquee from 'react-fast-marquee'
import Title from '../title/Title'

export default function Genres({ games }) {
  return (
    <div className='lg:mx-24'>
      <Title text={"All Genres"} />
      {games.length ?
        <Marquee className="py-10" pauseOnHover={true}>
          {
            games.map(m => {
              return (
                <div key={m.gameTitle} className="bg-green-800 flex items-center justify-center text-white rounded-lg mx-5 h-14 w-52">
                  {m.genre}
                </div>
              )
            })
          }
        </Marquee> : <p className='text-center'>No Genres Found</p>}
    </div>
  )
}
