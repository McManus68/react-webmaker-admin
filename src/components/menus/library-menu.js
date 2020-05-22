import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ImageUploader from 'react-images-upload'

import { uploadImage } from '../../redux'

import LinearProgress from '@material-ui/core/LinearProgress'

import './library-menu.scss'

const LibraryMenu = () => {
  const currentSiteId = useSelector(state => state.editor.currentSiteId)
  const images = useSelector(state => state.library.images)
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
          return <img key={i} src={image.thumbnail}></img>
        })}
      </div>
    </div>
  )
}

export default LibraryMenu
