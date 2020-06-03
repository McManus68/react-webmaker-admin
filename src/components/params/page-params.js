import React from 'react'
import PropTypes from 'prop-types'

import TextInput from '../form/text-input'

import './page-params.scss'

const PageParams = ({ page }) => {
  const params = ['title', 'slug', 'description']

  return (
    <div className='page-params'>
      {params.map((param, i) => {
        return <TextInput key={i} name={param} label={param} />
      })}
    </div>
  )
}

export default PageParams

PageParams.propTypes = {}
