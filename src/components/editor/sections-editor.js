import React from 'react'
import { useFormContext, useFieldArray } from 'react-hook-form'

import Params from '../params/params'

import { FaTrashAlt, FaPlusCircle } from 'react-icons/fa'
import RowsEditor from './rows-editor'

const SectionsEditor = ({ path }) => {
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
