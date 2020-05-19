import React from 'react'
import { useFormContext, useFieldArray } from 'react-hook-form'

import Params from '../params/params'

import { FaTrashAlt, FaPlusCircle } from 'react-icons/fa'
import RowEditor from './row-editor'

import './section-editor.scss'

const SectionEditor = ({ path }) => {
  const { control } = useFormContext()

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
      {fields &&
        fields.map((field, i) => (
          <div key={field.id} className='section-editor'>
            <div className='add-before'>
              <FaPlusCircle onClick={() => insert(i, newSection())} />
            </div>

            <h2>{field.type}</h2>
            <Params
              component={field}
              configType='SECTION'
              path={`${path}[${i}]`}
            />
            {field.type === 'SECTION_CUSTOM' && (
              <RowEditor path={`${path}[${i}].rows`} />
            )}
            <div className='remove'>
              <FaTrashAlt onClick={() => remove(i)} />
            </div>
            <div className='add-after'>
              <FaPlusCircle onClick={() => insert(i + 1, newSection())} />
            </div>
          </div>
        ))}
    </div>
  )
}

export default SectionEditor
