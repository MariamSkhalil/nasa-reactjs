import React from 'react'

export default function (props) {
  const {handleToggleShow, data} = props
  return (
    <div className='sideBar'>
        <div onClick={handleToggleShow} className='bgOverlay'></div>
        <div className='sideBarContent'>
            <h2> {data?.title} </h2>
            <div className='descriptionContainer'>
                <p className='descriptionTitle'> {data?.date} </p>
                <p className='description'> {data?.explanation} </p>
            </div>
            <button onClick={handleToggleShow}>
                <i className="fa-solid fa-angles-right"></i>
            </button>
        </div>
    </div>
  )
}
