import React from 'react'
import { useFormContext, useFieldArray } from 'react-hook-form'

import BlockEditor from './block-editor'

import { FaTrashAlt, FaPlusCircle } from 'react-icons/fa'

import './row-editor.scss'

const RowEditor = ({ path, scope }) => {
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
      <div className='prepend-row'>
        {!fields.length ? (
          <FaPlusCircle onClick={() => prepend(newRow())} />
        ) : null}
      </div>
      {fields &&
        fields.map((field, i) => (
          <div key={field.id}>
            <div className='row-editor'>
              <div className='add-before'>
                <FaPlusCircle onClick={() => insert(i, newRow())} />
              </div>

              <input
                name={`${path}[${i}].type`}
                type='hidden'
                ref={register()}
                defaultValue={field.type}
              />
              <BlockEditor path={`${path}[${i}].blocks`} scope={scope} />
              <div className='remove'>
                <FaTrashAlt onClick={() => remove(i)} />
              </div>
              <div className='add-after'>
                <FaPlusCircle onClick={() => insert(i + 1, newRow())} />
              </div>
            </div>
          </div>
        ))}
    </div>
  )
}

export default RowEditor
