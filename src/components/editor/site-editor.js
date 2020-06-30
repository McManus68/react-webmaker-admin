import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setActiveIndex } from '../../redux'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import FooterIcon from '@material-ui/icons/BorderBottom'
import PageEditor from './page-editor'
import FooterEditor from './footer-editor'
import styled from 'styled-components'

const StyledSiteEditor = styled.div`
  display: flex;
  flex-grow: 1;
  header {
    box-shadow: none;
  }
`
const SiteEditorContent = styled.div`
  flex-grow: 1;
`

const StyledTabs = styled(Tabs)`
  background-color: ${props => props.theme.color.bg};
  color: ${props => props.theme.color.primary};
`

const SiteEditor = () => {
  const dispatch = useDispatch()
  const site = useSelector(state => state.editor.site)
  const activeIndex = useSelector(state => state.editor.activeIndex)

  const handleChangeTab = (event, newIndex) => {
    dispatch(setActiveIndex(newIndex))
  }

  return (
    <StyledSiteEditor>
      {site && (
        <SiteEditorContent>
          <AppBar position='static'>
            <StyledTabs value={activeIndex} onChange={handleChangeTab}>
              {site && site.pages.map((page, i) => <Tab key={i} label={page.title} />)}
              <Tab icon={<FooterIcon />} />
            </StyledTabs>
          </AppBar>

          {site &&
            site.pages.map((page, i) => (
              <PageEditor
                page={page}
                key={i}
                activeIndex={activeIndex}
                index={i}
                path={`pages[${i}]`}
              />
            ))}
          <FooterEditor footer={site.footer} activeIndex={activeIndex} index={site.pages.length} />
        </SiteEditorContent>
      )}
    </StyledSiteEditor>
  )
}

export default SiteEditor
