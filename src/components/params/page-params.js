import React from 'react'
import TextInput from '../form/text-input'
import SwitchInput from '../form/switch-input'
import ParamsContainer from './params-container'

const PageParams = () => {
  const params = ['title', 'slug', 'description']

  return (
    <ParamsContainer>
      {params.map((param, i) => {
        return <TextInput key={i} name={param} label={param} />
      })}
      <SwitchInput name='main' label='Main page?' defaultValue={false} />
    </ParamsContainer>
  )
}

export default PageParams
