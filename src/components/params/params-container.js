import React from 'react'

import './params-container.scss'

const ParamsContainer = ({ label, children }) => {
  return (
    <div className='params-container'>
      <label>{label}</label>
      {children}
    </div>
  )
}

export default ParamsContainer
