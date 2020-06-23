import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ImageUploader from 'react-images-upload'
import { uploadImage, setSelectedImage } from '../../redux'
import LinearProgress from '@material-ui/core/LinearProgress'
import styled from 'styled-components'

const Menu = styled.div`
  border-top: 1px solid lightgrey;
`
const MenuHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`
const Library = styled.div`
  display: grid;
  gap: 5px;
  grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
  grid-auto-flow: dense;
  align-self: center;
`
const Image = styled.img`
  box-sizing: border-box;
  max-width: 100%;
  max-height: 100%;
  border: 4px solid lightgray;
  cursor: pointer;
  ${({ active }) =>
    active &&
    ` border-color: var(--primary-color);
    z-index: 2;`}
`

const StyledImageUploader = styled(ImageUploader)`
  .fileContainer {
    background-color: none;
    padding: 0;
    margin: 0;
  }
`

const LibraryMenu = () => {
  const currentSiteId = useSelector(state => state.editor.currentSiteId)
  const images = useSelector(state => state.library.images)
  const selectedImage = useSelector(state => state.library.selectedImage)
  const uploadProgress = useSelector(state => state.library.uploadProgress)

  const dispatch = useDispatch()

  const onDrop = pictures => {
    pictures.map(picture => dispatch(uploadImage(currentSiteId, picture)))
  }

  return (
    <Menu>
      {uploadProgress !== 0 ? <LinearProgress variant='buffer' value={uploadProgress} /> : null}

      <StyledImageUploader
        withIcon={false}
        withLabel={false}
        withPreview={false}
        buttonText='Upload'
        onChange={onDrop}
        imgExtension={['.jpg', '.png', '.gif']}
        maxFileSize={5242880}
      />

      <Library>
        {images.map((image, i) => {
          return (
            <Image
              key={i}
              active={selectedImage.name == image.name}
              src={image.thumbnail}
              onClick={() => dispatch(setSelectedImage(image))}
            ></Image>
          )
        })}
      </Library>
    </Menu>
  )
}

export default LibraryMenu
