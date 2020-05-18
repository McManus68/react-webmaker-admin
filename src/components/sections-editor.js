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
import { saveCurrentPage } from '../redux'

import RowsEditor from './rows-editor'

import './page-editor.scss'

function SectionsEditor({ path }) {
  const { control, register, getValues } = useFormContext()

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: path,
    }
  )

  const newSection = () => {
    return {
      type: 'SECTION_CUSTOM',
      params: {},
      rows: [],
    }
  }

  return (
    <div>
      <FaPlusCircle onClick={() => prepend(newSection())} />
      {fields &&
        fields.map((field, i) => (
          <div key={field.id}>
            <div className='page-editor-section-container'>
              <h2>{field.type}</h2>
              <div className='page-editor-section-content'>
                <Params
                  component={field}
                  configType='SECTION'
                  path={`${path}[${i}]`}
                />

                <RowsEditor path={`${path}[${i}].rows`} />
              </div>
              <FaTrashAlt onClick={() => remove(i)} />
            </div>
            <FaPlusCircle onClick={() => insert(i + 1, newSection())} />
          </div>
        ))}
    </div>
  )
}

export default SectionsEditor
