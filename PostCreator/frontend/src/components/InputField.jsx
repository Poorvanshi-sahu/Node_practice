import React from 'react'

const InputField = ({type, placeholder, name, inputHandler, value}) => {
  return (
    <input type={type} placeholder={placeholder} name={name} value={value} className='px-2 py-2 outline-none w-full mt-2 border-[1px] rounded-md bg-transparent focus:outline-none focus:bg-transparent focus:shadow-none' onChange={(e)=>inputHandler(e)}/>
  )
}

export default InputField