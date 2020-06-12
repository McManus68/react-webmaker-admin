import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchConfig, fetchSites } from './redux'
import Header from './components/header'
import SitesMenu from './components/menus/sites-menu'
import SiteEditor from './components/editor/site-editor'
import styled from 'styled-components'

const Main = styled.main`
  display: flex;
`

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchConfig())
    dispatch(fetchSites())
  }, [])

  const site = useSelector(state => state.editor.site)
  return (
    <div>
      <Header />

      <Main>
        <SitesMenu />
        {site && <SiteEditor site={site} />}
      </Main>

      <footer></footer>
    </div>
  )
}

export default App
