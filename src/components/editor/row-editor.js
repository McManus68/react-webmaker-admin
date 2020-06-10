import React from 'react'
import { useFormContext, useFieldArray } from 'react-hook-form'
import { FaTrashAlt, FaPlusCircle } from 'react-icons/fa'
import BlockEditor from './block-editor'
import {
  GenericEditor,
  Prepend,
  AddBefore,
  AddAfter,
  Remove,
} from '../../styles/mixin'

const RowEditor = ({ path, scope }) => {
  const { control, register } = useFormContext()
  const { fields, prepend, remove, insert } = useFieldArray({
    control,
    name: path,
  })

  const newRow = () => {
    return {
      type: 'ROW',
      blocks: [],
    }
  }
  return (
    <>
      {!fields.length ? (
        <Prepend type='row'>
          <FaPlusCircle onClick={() => prepend(newRow())} />
        </Prepend>
      ) : null}

      {fields &&
        fields.map((field, i) => (
          <GenericEditor key={field.id} type='row'>
            <AddBefore type='row'>
              <FaPlusCircle onClick={() => insert(i, newRow())} />
            </AddBefore>

            <input
              name={`${path}[${i}].type`}
              type='hidden'
              ref={register()}
              defaultValue={field.type}
            />

            <BlockEditor path={`${path}[${i}].blocks`} scope={scope} />

            <Remove type='row'>
              <FaTrashAlt onClick={() => remove(i)} />
            </Remove>
            <AddAfter type='row'>
              <FaPlusCircle onClick={() => insert(i + 1, newRow())} />
            </AddAfter>
          </GenericEditor>
        ))}
    </>
  )
}

export default RowEditor
