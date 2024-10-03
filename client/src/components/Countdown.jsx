import React from 'react'

function Countdown({unit, number}) {
  return (
    <div className='w-[5.125rem] h-[3.25rem] flex flex-col items-center justify-center border border-solid rounded-md bg-gray-300'>
        <span className='text-[18px]'>{number}</span>
        <span className='text-xs'>{unit}</span>
    </div>
  )
}

export default Countdown
