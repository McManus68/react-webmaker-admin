import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ImageUploader from 'react-images-upload'

import { uploadImage, setSelectedImage } from '../../redux'
import LinearProgress from '@material-ui/core/LinearProgress'

import './library-menu.scss'

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
    <div className='library-menu'>
      <div className='site-editor-menu-header'>
        <h3>Resources</h3>
      </div>

      {uploadProgress !== 0 ? (
        <LinearProgress variant='buffer' value={uploadProgress} />
      ) : null}

      <ImageUploader
        withIcon={false}
        withLabel={false}
        withPreview={false}
        buttonText='Upload'
        onChange={onDrop}
        imgExtension={['.jpg', '.png', '.gif']}
        maxFileSize={5242880}
      />

      <div className='library-images'>
        {images.map((image, i) => {
          return (
            <>
              <img
                key={i}
                className={selectedImage.name == image.name ? 'selected' : ''}
                src={image.thumbnail}
                onClick={() => dispatch(setSelectedImage(image))}
              ></img>
            </>
          )
        })}
      </div>
    </div>
  )
}

export default LibraryMenu
