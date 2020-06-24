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
import { getDefaultParams } from '../../utils/utils-params'
import styled from 'styled-components'

const SectionEditor = ({ section, path, index, hasNext }) => {
  const config = useSelector(state => state.config.section)
  const isStandAlone = config.find(item => item.type === section.type)?.standalone
  const dispatch = useDispatch()

  const newSection = type => ({
    type: type,
    rows: type === 'SECTION_CUSTOM' ? [{ type: 'ROW', blocks: [] }] : [],
    params: getDefaultParams(config, type),
  })

  const [open, setOpen] = useState(false)
  const onClose = () => setOpen(false)
  const onSave = data => dispatch(saveParams(`${path}[${index}]`, data))

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemTypes.SECTION,
    canDrop: () => section.type === undefined,
    drop: item => dispatch(setSection(path, index, newSection(item.componentType))),
    collect: mon => ({
      isOver: !!mon.isOver(),
      canDrop: !!mon.canDrop(),
    }),
  })

  return (
    <>
      <GenericEditor type='section' ref={drop} canDrop={canDrop} isOver={isOver}>
        <FactorySection section={section} recursive={false}>
          {section.rows.map((row, i) => (
            <RowEditor key={i} index={i} row={row} path={`${path}[${index}].rows`} scope='PAGE' />
          ))}
        </FactorySection>

        <AddBefore type='section' onClick={() => dispatch(addSection(path, index))} />
        <Remove type='section' onClick={() => dispatch(removeSection(path, index))} />
        <AddAfter type='section' onClick={() => dispatch(addSection(path, index + 1))} />
        {isStandAlone && <Settings type='section' onClick={() => setOpen(!open)} />}

        {section.type && isStandAlone ? (
          <ParamsDialog open={open} defaultValues={section} onClose={onClose} onSave={onSave}>
            <Params component={section} config={config.find(c => c.type === section.type)} />
          </ParamsDialog>
        ) : null}
      </GenericEditor>
    </>
  )
}

export default SectionEditor
