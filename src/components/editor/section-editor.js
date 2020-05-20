import React, { useState } from 'react'
import { useFormContext, useFieldArray } from 'react-hook-form'
import { useSelector } from 'react-redux'
import Params from '../params/params'

import { FaTrashAlt, FaPlusCircle } from 'react-icons/fa'
import RowEditor from './row-editor'

import './section-editor.scss'

const SectionEditor = ({ path }) => {
  const { control, register, setValue } = useFormContext()

  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray(
    {
      control,
      name: path,
    }
  )

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

  return (
    <div>
      <div className='prepend-section'>
        {!fields.length ? (
          <FaPlusCircle onClick={() => prepend(newSection())} />
        ) : null}
      </div>

      {fields &&
        fields.map((field, i) => (
          <div key={field.id} className='section-editor'>
            <div className='add-before'>
              <FaPlusCircle onClick={() => insert(i, newSection())} />
            </div>

            <select
              name={`${path}[${i}].type`}
              ref={register()}
              onChange={e => onChangeType(field, e.target.value)}
              defaultValue={field.type}
            >
              {sectionTypes.map((type, i) => (
                <option key={i} value={type}>
                  {type}
                </option>
              ))}
            </select>

            <h2>{field.type}</h2>
            {isStandAlone(field) ? (
              <Params
                component={field}
                configType='SECTION'
                path={`${path}[${i}]`}
              />
            ) : (
              <RowEditor path={`${path}[${i}].rows`} />
            )}

            <div className='remove'>
              <FaTrashAlt onClick={() => remove(i)} />
            </div>
            <div className='add-after'>
              <FaPlusCircle onClick={() => insert(i + 1, newSection())} />
            </div>
          </div>
        ))}
    </div>
  )
}

export default SectionEditor
