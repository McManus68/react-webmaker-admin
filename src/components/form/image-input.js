import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { useFormContext, Controller } from 'react-hook-form'
import { useSelector } from 'react-redux'
import InputAdornment from '@material-ui/core/InputAdornment'
import { TextField } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import SwitchIcon from '@material-ui/icons/CompareArrows'
import styled from 'styled-components'

const Preview = styled.img`
  width: 30px;
  height: 30px;
  padding: 0.4rem;
`
const StyledSwitchIcon = styled(SwitchIcon)`
  font-size: 1.2rem;
  cursor: pointer;
`

const ImageInput = ({ config, name }) => {
  const { control, getValues, setValue } = useFormContext()
  const inputRef = useRef()

  const selectedImage = useSelector(state => state.library.selectedImage)
  const images = useSelector(state => state.library.images)

  const defaultImage = images.find(image => image.name === getValues(name))
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
                <Preview src={image} />
                <IconButton onClick={selectImage}>
                  <StyledSwitchIcon />
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
    />
  )
}

export default ImageInput

ImageInput.propTypes = {
  config: PropTypes.object,
  name: PropTypes.string,
}
