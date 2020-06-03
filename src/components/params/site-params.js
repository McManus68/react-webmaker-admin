import React from 'react'

import TextInput from '../form/text-input'

import './site-params.scss'

const SiteParams = ({ site }) => {
  const params = ['name', 'title', 'description']
  return (
    <div className='site-params'>
      <label>{site.id}</label>
      {params.map((param, i) => {
        return (
          <TextInput
            key={i}
            name={param}
            label={param}
            defaultValue={site[param]}
          />
        )
      })}
    </div>
  )
}

export default SiteParams
