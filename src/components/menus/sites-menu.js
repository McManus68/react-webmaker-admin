import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchSite, setSite, createSite, fetchImages } from '../../redux'
import IconButton from '@material-ui/core/IconButton'
import AddIcon from '@material-ui/icons/Add'
import { Menu, MenuHeader } from '../../styles/mixin'
import styled from 'styled-components'

const AddButton = styled(IconButton)`
  color: ${props => props.theme.color.primary};
`
const List = styled.ul`
  display: flex;
  flex-direction: column;
  margin-top: 1.4rem;
`
const Site = styled.li`
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  list-style: none;
  height: 40px;
  cursor: pointer;
  padding: 0.4rem;
  &:hover,
  &.active {
    background-color: rgb(238, 236, 236);
    border-left: 4px solid ${props => props.theme.color.primary};
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }
`

const SitesMenu = () => {
  const sites = useSelector(state => state.site.sites)
  const site = useSelector(state => state.site.site)
  const currentSiteId = useSelector(state => state.editor.currentSiteId)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(setSite(site))
    if (site) dispatch(fetchImages(site.id))
  }, [site])

  const onCreateSite = () => {
    const newSite = { title: 'NEW_SITE', name: 'NEW_SITE', pages: [] }
    dispatch(createSite(newSite))
  }

  return (
    <Menu>
      <MenuHeader>
        <AddButton onClick={() => dispatch(onCreateSite)}>
          <AddIcon />
        </AddButton>
      </MenuHeader>

      <List>
        {sites.map(site => (
          <Site
            className={currentSiteId === site.id ? 'active' : ''}
            key={site.id}
            onClick={() => dispatch(fetchSite(site.id))}
          >
            {site.title}
          </Site>
        ))}
      </List>
    </Menu>
  )
}

export default SitesMenu
