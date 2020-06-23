import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchConfig, fetchSites } from './redux'
import Header from './components/header'
import LeftMenu from './components/menus/left-menu'
import RightMenu from './components/menus/right-menu'
import SiteEditor from './components/editor/site-editor'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
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
      <DndProvider backend={HTML5Backend}>
        <Main>
          <LeftMenu />
          <SiteEditor />
          <RightMenu />
        </Main>
      </DndProvider>

      <footer></footer>
    </div>
  )
}

export default App
