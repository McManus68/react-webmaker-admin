import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, FormContext } from 'react-hook-form'
import { saveFooter } from '../../redux'
import RowEditor from './row-editor'
import { Container } from '../../styles/mixin'
import { schema } from '../../yup/footer.js'
import FactoryFooter from '@bit/mcmanus68.webmaker.factory.factory-footer'

const FooterEditor = ({ footer, activeIndex, index }) => {
  const methods = useForm({
    validationSchema: schema,
    defaultValues: footer,
  })

  useEffect(() => {
    methods.reset(footer)
  }, [footer])

  const tabIndexToSave = useSelector(state => state.editor.tabIndexToSave)

  const dispatch = useDispatch()

  useEffect(() => {
    if (tabIndexToSave.index === index) {
      methods.handleSubmit(onSaveFooter)()
    }
  }, [tabIndexToSave])

  const onSaveFooter = data => {
    console.log('FOOTER SAVED', data)
    dispatch(saveFooter(data))
  }

  return (
    activeIndex === index && (
      <Container>
        <FormContext {...methods}>
          <form>
            <input name='type' type='hidden' ref={methods.register()} defaultValue={footer.type} />

            <RowEditor path='rows' scope='FOOTER' />
          </form>
        </FormContext>
      </Container>
    )
  )
}

export default FooterEditor
