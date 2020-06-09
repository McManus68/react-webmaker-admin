import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, FormContext } from 'react-hook-form'
import { saveHeader } from '../../redux'
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
  const navs = useSelector(state => state.config.nav)

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
      <div className='container'>
        <FormContext {...methods}>
          <form>
            <SelectInput name='nav' label='Navigation' values={navs} />
          </form>
        </FormContext>
      </div>
    )
  )
}

export default HeaderEditor
