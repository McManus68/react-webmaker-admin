import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchSite, setEditingSite, createSite, fetchImages } from '../../redux'

import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'

import './sites-menu.scss'

const SitesMenu = () => {
  const sites = useSelector(state => state.site.sites)
  const site = useSelector(state => state.site.site)
  const currentSiteId = useSelector(state => state.editor.currentSiteId)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setEditingSite(site))
    if (site) dispatch(fetchImages(site.id))
  }, [site])

  const onCreateSite = () => {
    const newSite = { title: 'NEW_SITE', name: 'NEW_SITE', pages: [] }
    dispatch(createSite(newSite))
  }

  return (
    <div className='sites-menu'>
      <div className='site-editor-menu-header'>
        <h3>Sites</h3>
        <div className='menu-controls'>
          <IconButton
            className='add-site'
            onClick={() => dispatch(onCreateSite)}
          >
            <AddIcon />
          </IconButton>
        </div>
      </div>

      <ul>
        {sites.map(site => (
          <li
            key={site.id}
            className={currentSiteId === site.id ? 'active' : ''}
            onClick={() => dispatch(fetchSite(site.id))}
          >
            {site.title}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SitesMenu
