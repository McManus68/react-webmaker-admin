import React, { useState, useEffect, useRef } from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import { useSelector } from 'react-redux'

import InputAdornment from '@material-ui/core/InputAdornment'
import { TextField } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import SwitchIcon from '@material-ui/icons/CompareArrows'

import './image-input.scss'

const ImageInput = ({ config, name, defaultValue }) => {
  const { control, setValue } = useFormContext()
  const inputRef = useRef()

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
    <Controller
      as={
        <TextField
          inputRef={inputRef}
          variant={config.isArray ? 'standard' : 'outlined'}
          InputProps={{
            readOnly: true,
            endAdornment: (
              <InputAdornment>
                <img src={image} />
                <IconButton onClick={selectImage}>
                  <SwitchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      }
      name={name}
      label={config.isArray ? null : config.name}
      onFocus={() => inputRef.current.focus()}
      control={control}
      className='image-input'
    />
  )
}

export default ImageInput
