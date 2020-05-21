import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchSite, setEditingSite, createSite } from '../redux'

import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'

import './menu.scss'

const Menu = () => {
  const sites = useSelector(state => state.site.sites)
  const site = useSelector(state => state.site.site)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setEditingSite(site))
  }, [site])

  useEffect(() => {
    console.log('SITES CHANGED')
    //dispatch(setEditingSite(site))
  }, [sites])

  // Save the entire site
  const onCreateSite = () => {
    const newSite = { title: 'NEW_SITE', name: 'NEW_SITE', pages: [] }
    dispatch(createSite(newSite))
    console.log('onCreateSite')
  }

  return (
    <div className='menu'>
      <IconButton onClick={() => dispatch(onCreateSite)}>
        <AddIcon />
      </IconButton>
      <ul>
        {sites.map(site => (
          <li key={site.id} onClick={() => dispatch(fetchSite(site.id))}>
            {site.title}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Menu
