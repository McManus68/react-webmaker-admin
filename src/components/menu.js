import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchSite, setEditingSite, createSite } from '../redux'

import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'

import './menu.scss'

const Menu = () => {
  const sites = useSelector(state => state.site.sites)
  const site = useSelector(state => state.site.site)
  const currentSiteId = useSelector(state => state.editor.currentSiteId)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setEditingSite(site))
  }, [site])

  const onCreateSite = () => {
    const newSite = { title: 'NEW_SITE', name: 'NEW_SITE', pages: [] }
    dispatch(createSite(newSite))
  }

  return (
    <div className='menu'>
      <div className='menu-controls'>
        <IconButton className='add-site' onClick={() => dispatch(onCreateSite)}>
          <AddIcon />
        </IconButton>
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

export default Menu
