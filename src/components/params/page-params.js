import React from 'react'
import TextInput from '../form/text-input'
import ParamsContainer from './params-container'

const PageParams = () => {
  const params = ['title', 'slug', 'description']

  return (
    <ParamsContainer row>
      {params.map((param, i) => {
        return <TextInput key={i} name={param} label={param} />
      })}
    </ParamsContainer>
  )
}

export default PageParams
