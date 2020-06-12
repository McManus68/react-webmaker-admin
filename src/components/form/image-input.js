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

const ImageInput = ({ name, label, defaultValue, variant }) => {
  const { control, getValues, setValue } = useFormContext()
  const inputRef = useRef()

  const selectedImage = useSelector(state => state.library.selectedImage)
  const images = useSelector(state => state.library.images)
  const [image, setImage] = useState()

  useEffect(() => {
    setImage(images.find(image => image.name === getValues(name)))
  }, [images])

  const selectImage = () => {
    setValue(name, selectedImage.name)
    setImage(selectedImage)
  }

  return (
    <Controller
      as={
        <TextField
          inputRef={inputRef}
          variant={variant}
          InputProps={{
            readOnly: true,
            endAdornment: (
              <InputAdornment>
                {image && <Preview src={image.thumbnail} />}
                <IconButton onClick={selectImage}>
                  <StyledSwitchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      }
      name={name}
      label={label}
      onFocus={() => inputRef.current.focus()}
      control={control}
      defaultValue={getValues(name) || defaultValue}
    />
  )
}

export default ImageInput

ImageInput.propTypes = {
  name: PropTypes.string,
  label: PropTypes.string,
  variant: PropTypes.string,
}

ImageInput.defaultProps = {
  name: PropTypes.string,
  label: PropTypes.string,
  variant: 'outlined',
}
