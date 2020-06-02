import React, { useState, useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { useSelector } from 'react-redux'

import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/icons/CompareArrows'

import './image-input.scss'

const ImageInput = ({ name, defaultValue }) => {
  const { register, setValue } = useFormContext()

  const selectedImage = useSelector(state => state.library.selectedImage)

  const images = useSelector(state => state.library.images)

  const defaultImage = images.find(image => image.name === defaultValue)
  const [image, setImage] = useState(null)

  useEffect(() => {
    if (defaultImage) setImage(defaultImage.thumbnail)
  }, [defaultImage])

  const selectImage = () => {
    setValue(name, selectedImage.name)
    setImage(selectedImage.thumbnail)
  }

  return (
    <div className='image-input'>
      <input
        name={name}
        type='hidden'
        ref={register()}
        defaultValue={defaultValue}
      />
      <img src={image} />
      <IconButton onClick={selectImage}>
        <Icon />
      </IconButton>
    </div>
  )
}

export default ImageInput
