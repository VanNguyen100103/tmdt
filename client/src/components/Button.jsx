import React,{memo} from 'react'

function Button({name, handleOnClick, style, iconBefore, iconAfter ,fw}) {

  return (
    <button type="button" className={style ? style : `px-4 py-2 rounded-md mt-6 text-white bg-red-600 text-semi ${fw ? 'w-full' : 'w-fit'}`} onClick={()=>{handleOnClick && handleOnClick()}}>
   
          {iconBefore}
          <span>{name}</span>
          {iconAfter}
     
    </button>
  )
}

export default memo(Button)
