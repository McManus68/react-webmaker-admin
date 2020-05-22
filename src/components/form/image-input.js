import React from 'react'
import { useFormContext } from 'react-hook-form'
import { useSelector } from 'react-redux'

import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/icons/CompareArrows'

import './image-input.scss'

const ImageInput = ({ name, defaultValue }) => {
  const { register, setValue } = useFormContext()

  const selectedImage = useSelector(state => state.library.selectedImage)

  const selectImage = () => {
    setValue(name, selectedImage.name)
  }

  return (
    <div className='image-input'>
      <input
        name={name}
        type='text'
        ref={register()}
        defaultValue={defaultValue}
      />
      <IconButton className='icon-set-image' onClick={selectImage}>
        <Icon />
      </IconButton>
    </div>
  )
}

export default ImageInput
