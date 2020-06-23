import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addSection, setSection, removeSection, saveParams } from '../../redux'
import Params from '../params/params'
import RowEditor from './row-editor'
import { AddBefore, AddAfter, Remove, Prepend, GenericEditor, Settings } from './controls'
import FactorySection from '@bit/mcmanus68.webmaker.factory.factory-section'
import ParamsDialog from '../params/params-dialog'
import { ItemTypes } from '../../types/types'
import { useDrop } from 'react-dnd'

import styled from 'styled-components'

const StyledGenericEditor = styled(GenericEditor)`
  background-color: red;
`

const SectionEditor = ({ section, path, index }) => {
  const config = useSelector(state => state.config.section)
  const defaultSection = useSelector(state => state.config.default.section)
  const isStandAlone = section => config.find(item => item.type === section.type).standalone

  const dispatch = useDispatch()

  const [open, setOpen] = useState(false)
  const onClose = () => setOpen(false)
  const onSave = data => dispatch(saveParams(`${path}.params`, data.params))

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemTypes.SECTION,
    canDrop: () => true,
    drop: () => dispatch(setSection(path, index, { type: 'PROUT' })),
    collect: mon => ({
      isOver: !!mon.isOver(),
      canDrop: !!mon.canDrop(),
    }),
  })

  return (
    <StyledGenericEditor type='section' ref={drop}>
      <FactorySection section={section} recursive={false} />

      {section.rows &&
        section.rows.map((row, i) => (
          <RowEditor key={i} index={i} row={row} path={`${path}[${index}].rows`} scope='PAGE' />
        ))}

      <AddBefore type='section' onClick={() => dispatch(addSection(path, index))} />
      <Remove type='section' onClick={() => dispatch(removeSection(path, index))} />
      <AddAfter type='section' onClick={() => dispatch(addSection(path, index + 1))} />
      <Settings type='section' onClick={() => setOpen(!open)} />

      {section.type && isStandAlone(section) ? (
        <ParamsDialog open={open} defaultValues={section} onClose={onClose} onSave={onSave}>
          <Params component={section} config={config.find(c => c.type === section.type)} />
        </ParamsDialog>
      ) : null}
    </StyledGenericEditor>
  )
}

export default SectionEditor
