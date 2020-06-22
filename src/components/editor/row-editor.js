import React from 'react'
import { useFormContext, useFieldArray } from 'react-hook-form'
import { useSelector } from 'react-redux'
import BlockEditor from './block-editor'
import { AddBefore, AddAfter, Remove, Prepend, GenericEditor } from './controls'
import FactoryRow from '@bit/mcmanus68.webmaker.factory.factory-row'

const RowEditor = ({ path, scope }) => {
  const { control, register } = useFormContext()
  const { fields, prepend, remove, insert } = useFieldArray({
    control,
    name: path,
  })

  const defaultRow = useSelector(state => state.config.default.row)
  const newRow = () => ({ ...defaultRow })

  return (
    <>
      {!fields.length && <Prepend type='row' onClick={() => prepend(newRow())} />}

      {fields &&
        fields.map((field, i) => (
          <GenericEditor key={field.id} type='row'>
            <FactoryRow row={field} recursive={false}>
              <BlockEditor path={`${path}[${i}].blocks`} scope={scope} />
            </FactoryRow>

            <AddBefore type='row' onClick={() => insert(i, newRow())} />

            <input
              name={`${path}[${i}].type`}
              type='hidden'
              ref={register()}
              defaultValue={field.type}
            />

            <Remove type='row' onClick={() => remove(i)} />
            <AddAfter type='row' onClick={() => insert(i + 1, newRow())} />
          </GenericEditor>
        ))}
    </>
  )
}

export default RowEditor
