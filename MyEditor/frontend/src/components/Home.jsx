import React, { useState } from 'react'
import Sidebar from './sidebar'
import FileStructure from './FileStructure'
import FileContent from './FileContent'

const Home = () => {
  const [expanded, setExpanded] = useState(true)

  return (
    <div className='h-screen w-full flex pt-[1.8rem]'>
        <Sidebar setExpanded={setExpanded}expanded={expanded} />
        <FileStructure expanded={expanded}/>
        <FileContent/>
    </div>
  )
}

export default Home