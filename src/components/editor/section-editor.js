import React, { useState, useEffect } from 'react'
import { useFormContext, useFieldArray } from 'react-hook-form'
import { useSelector } from 'react-redux'
import Params from '../params/params'
import { FaTrashAlt, FaPlusCircle } from 'react-icons/fa'
import SelectType from '../form/select-type'
import RowEditor from './row-editor'
import GenericEditor from './generic-editor'

const SectionEditor = ({ path }) => {
  const [state, setState] = useState(false)
  const config = useSelector(state => state.config.section)

  const isStandAlone = section =>
    config.find(item => item.type === section.type).standalone

  const sectionTypes = config.map(item => item.type)

  const onChangeType = (field, value) => {
    field.type = value
    setState(!state)
  }

  const newSection = () => {
    return {
      type: 'SECTION_CUSTOM',
      params: {},
      rows: [],
    }
  }

  const getContent = (field, i) => {
    return (
      <>
        <SelectType
          name={`${path}[${i}].type`}
          values={sectionTypes}
          onChange={onChangeType}
          field={field}
        />

        {isStandAlone(field) ? (
          <Params
            component={field}
            config={config.find(c => c.type === field.type)}
            configType='SECTION'
            path={`${path}[${i}]`}
          />
        ) : (
          <RowEditor path={`${path}[${i}].rows`} scope='PAGE' />
        )}
      </>
    )
  }

  return (
    <GenericEditor
      path={path}
      getContent={getContent}
      type='SECTION'
      newObj={newSection}
    ></GenericEditor>
  )
}

export default SectionEditor
