import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, FormContext } from 'react-hook-form'
import { saveFooter } from '../../redux'
import RowEditor from './row-editor'

import { schema } from '../../utils/schema-footer.js'

import './section-editor.scss'

const FooterEditor = ({ footer, activeIndex, index }) => {
  const methods = useForm({
    validationSchema: schema,
    defaultValues: footer,
  })

  useEffect(() => {
    methods.reset(footer)
  }, [footer])

  console.log('footer = ', footer)

  const tabIndexToSave = useSelector(state => state.editor.tabIndexToSave)

  const dispatch = useDispatch()

  useEffect(() => {
    if (tabIndexToSave.index === index) {
      methods.handleSubmit(onSaveFooter)()
    }
  }, [tabIndexToSave])

  const onSaveFooter = data => {
    console.log('FOOTER SAVED', data)
    dispatch(saveFooter(data, index))
  }

  return (
    activeIndex === index && (
      <div className='container'>
        <FormContext {...methods}>
          <input
            name='type'
            type='hidden'
            ref={methods.register()}
            defaultValue={footer.type}
          />
          <form>
            <div className='section-editor'>
              <RowEditor path='rows' scope='FOOTER' />
            </div>
          </form>
        </FormContext>
      </div>
    )
  )
}

export default FooterEditor
