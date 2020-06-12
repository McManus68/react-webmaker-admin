import React from 'react'
import PropTypes from 'prop-types'
import TextInput from '../form/text-input'
import ImageInput from '../form/image-input'
import ParamsContainer from './params-container'

const SiteParams = ({ site }) => {
  const params = ['name', 'title', 'description']
  return (
    <ParamsContainer>
      <label>{site.id}</label>
      {params.map((param, i) => (
        <TextInput key={i} name={param} label={param} />
      ))}
      <ImageInput name='logo' label='logo' defaultValue='' />
    </ParamsContainer>
  )
}

export default SiteParams

SiteParams.propTypes = {
  site: PropTypes.object,
}
