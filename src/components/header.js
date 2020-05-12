import React from 'react'
import PropTypes from 'prop-types'

import './header.scss'

const Header = ({ items }) => {
  return (
    <header className='header'>
      <div className='container'></div>
    </header>
  )
}

export default Header

Header.propTypes = {
  items: PropTypes.array,
}
