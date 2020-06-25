import React, { useState, useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { useFormContext, Controller } from 'react-hook-form'
import { useSelector } from 'react-redux'
import InputAdornment from '@material-ui/core/InputAdornment'
import { TextField } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton'
import SwitchIcon from '@material-ui/icons/CompareArrows'
import { DnDTypes } from '../../types/types'
import { useDrop } from 'react-dnd'
import styled from 'styled-components'

const Preview = styled.div`
  width: 60px;
  height: 60px;
  border: 2px solid transparent;
  border-color: ${({ canDrop, isOver }) =>
    isOver && !canDrop
      ? 'red'
      : !isOver && canDrop
      ? 'yellow'
      : isOver && canDrop
      ? 'green'
      : 'inherit'};
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const ImageInput = ({ name, label, defaultValue, variant }) => {
  const { control, getValues, setValue } = useFormContext()
  const inputRef = useRef()

  const images = useSelector(state => state.library.images)
  const [image, setImage] = useState()

  useEffect(() => {
    setImage(images.find(image => image.name === getValues(name)))
  }, [images])

  const dropImage = newImage => {
    console.log('name', name, 'newImage', newImage)
    setValue(name, newImage.name)
    setImage(newImage)
  }

  const [{ isOver, canDrop }, drop] = useDrop({
    accept: DnDTypes.IMAGE,
    canDrop: () => true,
    drop: item => dropImage(item.image),
    collect: mon => ({
      isOver: !!mon.isOver(),
      canDrop: !!mon.canDrop(),
    }),
  })

  return (
    <div>
      <Preview ref={drop} canDrop={canDrop} isOver={isOver}>
        {image && <img src={image.thumbnail} />}
      </Preview>

      <Controller
        as={
          <TextField
            inputRef={inputRef}
            variant={variant}
            InputProps={{
              type: 'hidden',
            }}
          />
        }
        name={name}
        control={control}
        defaultValue={getValues(name) || defaultValue}
      />
    </div>
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
