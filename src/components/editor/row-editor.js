import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addRow, removeRow } from '../../redux'
import BlockEditor from './block-editor'
import { AddBefore, AddAfter, Remove, Prepend, GenericEditor } from './controls'
import FactoryRow from '@bit/mcmanus68.webmaker.factory.factory-row'

const RowEditor = ({ path, row, index, scope }) => {
  const dispatch = useDispatch()

  return (
    <GenericEditor type='row'>
      <FactoryRow row={row} recursive={false}>
        {row.blocks &&
          row.blocks.map((block, i) => (
            <BlockEditor
              key={i}
              index={i}
              block={block}
              path={`${path}.blocks[${i}]`}
              scope={scope}
            />
          ))}
      </FactoryRow>

      <AddBefore type='row' onClick={() => dispatch(addRow(path, index))} />
      <Remove type='row' onClick={() => dispatch(removeRow(path, index))} />
      <AddAfter type='row' onClick={() => dispatch(addRow(path, index + 1))} />
    </GenericEditor>
  )
}

export default RowEditor
