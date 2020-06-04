import React from 'react'
import { useFormContext } from 'react-hook-form'

const SelectType = ({ name, values, onChange, field }) => {
  const { register } = useFormContext()
  return (
    <select
      name={name}
      ref={register()}
      onChange={e => onChange(field, e.target.value)}
      defaultValue={field.type}
    >
      {values.map((type, i) => (
        <option key={i} value={type}>
          {type}
        </option>
      ))}
    </select>
  )
}

export default SelectType
