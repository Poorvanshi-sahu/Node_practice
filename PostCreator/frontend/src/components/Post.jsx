import React from 'react'

const Post = ({post}) => {
  return (
    <div className='h-60 w-52 bg-slate-900 p-3 rounded-md '>
        <div className="upper h-5/6 overflow-hidden">{post.content}</div>
        <div className="lower h-1/6 flex justify-between items-center">
            <button className='text-sm'>Edit</button>
        </div>
    </div>
  )
}

export default Post