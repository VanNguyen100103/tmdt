import React from 'react'

function SelectOption({icon}) {
  return (
    <div className='w-9 h-9 bg-white rounded-full border flex items-center justify-center cursor-pointer z-1 hover:bg-red-600 hover:text-white hover:scale-125 transition-transform'>
      {icon} 
    </div>
  )
}

export default SelectOption
