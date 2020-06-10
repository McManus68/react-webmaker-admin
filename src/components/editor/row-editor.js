import React from 'react'
import { useFormContext } from 'react-hook-form'
import BlockEditor from './block-editor'
import GenericEditor from './generic-editor'

const RowEditor = ({ path, scope }) => {
  const { register } = useFormContext()

  const newRow = () => {
    return {
      type: 'ROW',
      blocks: [],
    }
  }

  const getContent = (field, i) => {
    return (
      <>
        <input
          name={`${path}[${i}].type`}
          type='hidden'
          ref={register()}
          defaultValue={field.type}
        />

        <BlockEditor path={`${path}[${i}].blocks`} scope={scope} />
      </>
    )
  }

  return (
    <GenericEditor
      path={path}
      getContent={getContent}
      type='ROW'
      newObj={newRow}
    ></GenericEditor>
  )
}

export default RowEditor
