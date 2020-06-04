import React from 'react'
import PropTypes from 'prop-types'

import './params-container.scss'

const ParamsContainer = ({ label, children, column }) => {
  return (
    <div
      className='params-container'
      style={{ flexDirection: column ? 'column' : 'row' }}
    >
      <label>{label}</label>
      {children}
    </div>
  )
}

export default ParamsContainer

ParamsContainer.propTypes = {
  label: PropTypes.string,
  children: PropTypes.node,
  column: PropTypes.bool,
}

ParamsContainer.defaultProps = {
  column: true,
}
