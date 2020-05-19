import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchSite, setEditingSite } from '../redux'

import './menu.scss'

const Menu = () => {
  const sites = useSelector(state => state.site.sites)
  const site = useSelector(state => state.site.site)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setEditingSite(site))
  }, [site])

  return (
    <div className='menu'>
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
