import React from 'react'

function TextField({ name, label, defaultValue, register, type, ...others }) {
  return (
    <div className='field-container'>
      {type !== 'hidden' ? <label htmlFor='slug'>{label}</label> : null}
      <input
        name={name}
        type={type}
        defaultValue={defaultValue}
        ref={register()}
        {...others}
      />
    </div>
  )
}

export default TextField

TextField.propTypes = {}

TextField.defaultValue = {
  type: 'text',
}
