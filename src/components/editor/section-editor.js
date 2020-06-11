import React, { useState, useEffect } from 'react'
import { useFormContext, useFieldArray } from 'react-hook-form'
import { useSelector } from 'react-redux'
import Params from '../params/params'
import { FaTrashAlt, FaPlusCircle } from 'react-icons/fa'
import SelectType from '../form/select-type'
import RowEditor from './row-editor'
import {
  GenericEditor,
  Prepend,
  AddBefore,
  AddAfter,
  Remove,
} from '../../styles/mixin'

const SectionEditor = ({ path }) => {
  const { control, register } = useFormContext()
  const { fields, prepend, remove, insert } = useFieldArray({
    control,
    name: path,
  })

  const [state, setState] = useState(false)
  const config = useSelector(state => state.config.section)

  const isStandAlone = section =>
    config.find(item => item.type === section.type).standalone

  const sectionTypes = config.map(item => item.type)

  const getDefaultParams = type => {
    return config
      .find(item => item.type === type)
      .params.map(item => ({
        name: item.name,
        type: item.type,
        value: item.defaultValue,
      }))
  }

  const onChangeType = (field, value) => {
    field.type = value
    field.params = getDefaultParams(field.type)
    setState(!state)
  }

  const newSection = () => {
    return {
      type: 'SECTION_CUSTOM',
      params: getDefaultParams('SECTION_CUSTOM'),
      rows: [],
    }
  }

  return (
    <>
      {!fields.length ? (
        <Prepend type='section'>
          <FaPlusCircle onClick={() => prepend(newSection())} />
        </Prepend>
      ) : null}

      {fields &&
        fields.map((field, i) => (
          <GenericEditor key={field.id} type='section'>
            <AddBefore type='section'>
              <FaPlusCircle onClick={() => insert(i, newSection())} />
            </AddBefore>

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

            <Remove type='section'>
              <FaTrashAlt onClick={() => remove(i)} />
            </Remove>
            <AddAfter type='section'>
              <FaPlusCircle onClick={() => insert(i + 1, newSection())} />
            </AddAfter>
          </GenericEditor>
        ))}
    </>
  )
}

export default SectionEditor
