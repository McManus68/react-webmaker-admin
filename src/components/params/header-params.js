import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, FormContext } from 'react-hook-form'
import { saveHeader } from '../../redux'
import { Container } from '../../styles/mixin'
import SelectInput from '../form/select-input'
import ParamsContainer from './params-container'

const HeaderEditor = () => {
  const headerTypes = useSelector(state => state.config.header)
  return (
    <ParamsContainer label='Header'>
      <SelectInput name='header.type' label='Type' values={headerTypes} />
    </ParamsContainer>
  )
}

export default HeaderEditor
