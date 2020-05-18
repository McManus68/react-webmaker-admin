import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import {
  useForm,
  FormContext,
  useFormContext,
  useFieldArray,
} from 'react-hook-form'

import PageParams from './page-params'
import Params from './params'
import Button from '@material-ui/core/Button'

import { FaTrashAlt, FaPlusCircle } from 'react-icons/fa'

import { schema } from '../utils/schema-page.js'
import { saveEditorPage } from '../redux'

import SectionsEditor from './sections-editor'

import './page-editor.scss'

function PageEditor({ page, currentPage, pageIndex }) {
  const methods = useForm({
    validationSchema: schema,
    defaultValues: page,
  })

  useEffect(() => {
    //methods.reset(page)
    console.log('REDRAW PAGE', page)
    console.log('ERRORS', methods.errors)
  }, [page])

  const dispatch = useDispatch()

  const onSavePage = data => {
    console.log(data)
    dispatch(saveEditorPage(data, pageIndex))
  }

  return (
    currentPage === pageIndex && (
      <FormContext {...methods}>
        <form onSubmit={methods.handleSubmit(onSavePage)}>
          <div className='page-editor-container container'>
            <Button variant='contained' type='submit'>
              Save
            </Button>
            <PageParams page={page} />

            <SectionsEditor page={page} path='sections' />
          </div>
        </form>
      </FormContext>
    )
  )
}

export default PageEditor

PageEditor.propTypes = {
  children: PropTypes.node,
  currentPage: PropTypes.any.isRequired,
}
