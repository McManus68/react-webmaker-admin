import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useForm, FormContext } from 'react-hook-form'
import { savePage } from '../../redux'
import PageParams from '../params/page-params'
import { schema } from '../../yup/page.js'
import { Container } from '../../styles/mixin'
import SectionEditor from './section-editor'
import styled from 'styled-components'

const StyledPageEditor = styled.div`
  display: flex;
  flex-direction: column;
`
const PageEditor = ({ page, activeIndex, index }) => {
  const methods = useForm({
    validationSchema: schema,
    defaultValues: page,
  })

  useEffect(() => {
    methods.reset(page)
  }, [page])

  // If we change the a new page, we save the current page into the Redux store
  const tabIndexToSave = useSelector(state => state.editor.tabIndexToSave)

  useEffect(() => {
    if (tabIndexToSave.index === index) {
      console.log('ERRORS', methods.errors)
      methods.handleSubmit(onSavePage)()
    }
  }, [tabIndexToSave])

  const dispatch = useDispatch()

  const onSavePage = data => {
    console.log('PAGE SAVED', data)
    dispatch(savePage(data, index))
  }

  return (
    activeIndex === index && (
      <Container>
        <StyledPageEditor>
          <FormContext {...methods}>
            <PageParams page={page} />
            <SectionEditor page={page} path='sections' />
          </FormContext>
        </StyledPageEditor>
      </Container>
    )
  )
}

export default PageEditor
