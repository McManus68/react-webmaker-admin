import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ImageUploader from 'react-images-upload'

import { uploadImage } from '../../redux'

import IconButton from '@material-ui/core/IconButton'
import CloudIcon from '@material-ui/icons/Cloud'
import LinearProgress from '@material-ui/core/LinearProgress'

import './library-menu.scss'

const LibraryMenu = () => {
  const currentSiteId = useSelector(state => state.editor.currentSiteId)
  const imagesToUpload = useSelector(state => state.library.imagesToUpload)
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
        withIcon={true}
        withPreview={false}
        buttonText='Choose images'
        onChange={onDrop}
        imgExtension={['.jpg', '.png', '.gif']}
        maxFileSize={5242880}
      />
    </div>
  )
}

export default LibraryMenu
