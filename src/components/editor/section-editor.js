import React, { useState } from 'react'
import { useFormContext, useFieldArray } from 'react-hook-form'
import { useSelector } from 'react-redux'
import Params from '../params/params'
import RowEditor from './row-editor'
import { AddBefore, AddAfter, Remove, Prepend, GenericEditor, Settings } from './controls'
import FactorySection from '@bit/mcmanus68.webmaker.factory.factory-section'
import ParamsDialog from '../params/params-dialog'
import EditorControls from './editor-controls'
import TabPanel from '../ui/tab-panel'
import styled from 'styled-components'

const SectionEditor = ({ path }) => {
  const { control, watch, setValue, register } = useFormContext()
  const { fields, prepend, remove, insert } = useFieldArray({
    control,
    name: path,
  })

  const [state, setState] = useState(false)
  const [openSectionId, setOpenSectionId] = useState(-1)
  const config = useSelector(state => state.config.section)
  const defaultSection = useSelector(state => state.config.default.section)
  const isStandAlone = section => {
    console.log('isStandAlone', section, config)
    return config.find(item => item.type === section.type).standalone
  }

  const onSave = (field, newParams) => {
    field.params = newParams
    setOpenSectionId(-1)
    setState(!state)
  }

  const onClose = () => setOpenSectionId(-1)
  const newSection = () => ({ ...defaultSection })

  return (
    <>
      {!fields.length && <Prepend type='section' onClick={() => prepend(newSection())} />}

      {fields &&
        fields.map((field, i) => (
          <GenericEditor key={field.id} type='section'>
            <FactorySection section={field} recursive={false}>
              <RowEditor path={`${path}[${i}].rows`} scope='PAGE' />
            </FactorySection>

            <EditorControls
              type='section'
              field={field}
              index={i}
              remove={remove}
              insert={insert}
              newObj={newSection}
              settings={setOpenSectionId}
            />

            <input
              name={`${path}[${i}].type`}
              type='hidden'
              ref={register()}
              defaultValue={field.type}
            />

            {isStandAlone(field) ? (
              <>
                <ParamsDialog
                  open={openSectionId === field.id}
                  field={field}
                  path={`${path}[${i}].params`}
                  onSave={onSave}
                  onClose={onClose}
                >
                  <Params
                    component={field}
                    config={config.find(c => c.type === field.type)}
                    configType='SECTION'
                    path={`${path}[${i}]`}
                  />
                </ParamsDialog>
              </>
            ) : null}
          </GenericEditor>
        ))}
    </>
  )
}

export default SectionEditor
