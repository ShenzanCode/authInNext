import React from 'react'

const UserProfile = ({params}) => {
  return (
    <div className=' text-center content-center justify-center items-center p-3'>UserProfile <span className=' text-orange-400 bg-slate-800 text-2xl p-3 ml-4 m-auto'>{params.id}</span></div>
  )
}

export default UserProfile