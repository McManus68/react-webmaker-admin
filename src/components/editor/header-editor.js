import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, FormContext } from 'react-hook-form'
import { saveHeader } from '../../redux'
import { Container } from '../../styles/mixin'
import SelectInput from '../form/select-input'
import { schema } from '../../yup/header.js'

const HeaderEditor = ({ header, activeIndex, index }) => {
  const methods = useForm({
    validationSchema: schema,
    defaultValues: header,
  })

  useEffect(() => {
    methods.reset(header)
  }, [header])

  const tabIndexToSave = useSelector(state => state.editor.tabIndexToSave)
  const headerTypes = useSelector(state => state.config.header)

  const dispatch = useDispatch()

  useEffect(() => {
    if (tabIndexToSave.index === index) {
      methods.handleSubmit(onSaveHeader)()
    }
  }, [tabIndexToSave])

  const onSaveHeader = data => {
    console.log('HEADER SAVED', data)
    dispatch(saveHeader(data))
  }

  return (
    activeIndex === index && (
      <Container>
        <FormContext {...methods}>
          <SelectInput name='type' label='Type' values={headerTypes} />
        </FormContext>
      </Container>
    )
  )
}

export default HeaderEditor
