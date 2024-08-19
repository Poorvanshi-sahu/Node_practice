import React, { useState } from 'react'

const menuOptions = [
  "file-3-line", "search-line"
]

const Sidebar = ({expanded, setExpanded}) => {
  const [active, setActive] = useState("file-3-line")

  const clickHandler = (option)=>{
    if(option === "file-3-line" && active==="file-3-line"){
      setExpanded(!expanded)
    }
    setActive(option)
  }
  return (
    <div className='h-full w-10 border-r-[1px] border-gray-500'>
      {
        menuOptions.map((option, index)=>{
          return <i class={`ri-${option} text-gray-300 block px-1 py-1 text-2xl cursor-pointer ${active===option?"border-l-2 border-red-500":""}`} onClick={()=>clickHandler(option)} key={index}></i>
        })
      }
    </div>
  )
}

export default Sidebar