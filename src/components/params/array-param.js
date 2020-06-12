import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useFormContext, useFieldArray } from 'react-hook-form'
import TrashIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'
import IconButton from '@material-ui/core/IconButton'
import InputFactory from '../factories/input-factory'
import FieldSet from '../form/fieldset'
import styled from 'styled-components'

const ParamArray = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const ArrayParam = ({ path, param, values, component }) => {
  const { control } = useFormContext()
  const { fields, append, remove } = useFieldArray({
    control,
    name: path,
  })

  return (
    <FieldSet label={param.name}>
      {fields.map((value, i) => {
        return (
          <ParamArray key={i}>
            <InputFactory param={param} name={`${path}[${i}]`} />
            <IconButton onClick={() => remove(i)}>
              <TrashIcon />
            </IconButton>
          </ParamArray>
        )
      })}
      <IconButton onClick={() => append('')}>
        <AddIcon />
      </IconButton>
    </FieldSet>
  )
}

export default ArrayParam

ArrayParam.propTypes = {}

ArrayParam.defaultProps = {
  row: false,
}
