import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm, FormContext } from 'react-hook-form'
import { saveFooter } from '../../redux'
import RowEditor from './row-editor'
import { Container } from '../../styles/mixin'
import { schema } from '../../yup/footer.js'
import FactoryFooter from '@bit/mcmanus68.webmaker.factory.factory-footer'

const FooterEditor = ({ activeIndex, index }) => {
  const footer = useSelector(state => state.editor.site).footer

  const methods = useForm({
    validationSchema: schema,
    defaultValues: footer,
  })

  useEffect(() => {
    methods.reset(footer)
  }, [footer])

  const dispatch = useDispatch()

  const onSaveFooter = data => {
    console.log('FOOTER SAVED', data)
    dispatch(saveFooter(data))
  }

  return activeIndex === index && footer ? (
    <Container>
      <FormContext {...methods}>
        {footer.rows &&
          footer.rows.map((row, i) => <RowEditor key={i} row={row} path='rows' scope='FOOTER' />)}
      </FormContext>
    </Container>
  ) : null
}

export default FooterEditor
