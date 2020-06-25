import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addRow, removeRow, addBlock } from '../../redux'
import BlockEditor from './block-editor'
import { AddBefore, AddAfter, Remove, Prepend, GenericEditor } from './controls'
import { useDrop } from 'react-dnd'
import { DnDTypes } from '../../types/types'
import { getDefaultParams } from '../../utils/utils-params'
import FactoryRow from '@bit/mcmanus68.webmaker.factory.factory-row'

const RowEditor = ({ path, row, index }) => {
  const dispatch = useDispatch()
  const config = useSelector(state => state.config.block)
  const defaultBlock = useSelector(state => state.config.default.block)

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: DnDTypes.BLOCK,
    canDrop: () => true,
    drop: item =>
      dispatch(
        addBlock(`${path}[${index}].blocks`, {
          ...defaultBlock,
          type: item.componentType,
          params: getDefaultParams(config, item.componentType),
        })
      ),
    collect: mon => ({
      isOver: !!mon.isOver(),
      canDrop: !!mon.canDrop(),
    }),
  })

  return (
    <GenericEditor type='row' ref={drop} canDrop={canDrop} isOver={isOver}>
      <FactoryRow row={row} recursive={false}>
        {row.blocks.map((block, i) => (
          <BlockEditor key={i} index={i} block={block} path={`${path}[${index}].blocks`} />
        ))}
      </FactoryRow>

      <AddBefore type='row' onClick={() => dispatch(addRow(path, index))} />
      <Remove type='row' onClick={() => dispatch(removeRow(path, index))} />
      <AddAfter type='row' onClick={() => dispatch(addRow(path, index + 1))} />
    </GenericEditor>
  )
}

export default RowEditor
