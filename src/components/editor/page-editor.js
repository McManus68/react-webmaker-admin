import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useForm, FormContext } from 'react-hook-form'
import { savePage } from '../../redux'
import PageParams from '../params/page-params'

import { schema } from '../../yup/schema-page.js'

import SectionEditor from './section-editor'

import './page-editor.scss'

const PageEditor = ({ page, activeIndex, index }) => {
  // Each page has its own form - Like other pages are not in the DOM it's easier to handle this way
  // cause the other pages values are not accessible
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
      <FormContext {...methods}>
        <form>
          <div className='page-editor container'>
            <PageParams page={page} />
            <SectionEditor page={page} path='sections' />
          </div>
        </form>
      </FormContext>
    )
  )
}

export default PageEditor
