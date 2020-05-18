import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  useForm,
  FormContext,
  useFormContext,
  useFieldArray,
} from 'react-hook-form'

import ResponsiveParams from './responsive-params'
import AnimationParams from './animation-params'
import Params from './params'

import BlocksEditor from './blocks-editor'

import { FaTrashAlt, FaPlusCircle } from 'react-icons/fa'

function RowsEditor({ path }) {
  const { control, register } = useFormContext()

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: path,
    }
  )

  const newRow = () => {
    return {
      type: 'ROW',
      blocks: [],
    }
  }

  return (
    <div>
      <FaPlusCircle onClick={() => prepend(newRow())} />
      {fields &&
        fields.map((field, i) => (
          <div key={field.id}>
            <div className='page-editor-row-container'>
              <input
                name={`${path}[${i}].type`}
                type='hidden'
                ref={register()}
                defaultValue={field.type}
              />
              <h3>{field.type}</h3>
              <BlocksEditor path={`${path}[${i}].blocks`} />
              <FaTrashAlt onClick={() => remove(i)} />
            </div>
            <FaPlusCircle onClick={() => insert(i + 1, newRow())} />
          </div>
        ))}
    </div>
  )
}

export default RowsEditor
