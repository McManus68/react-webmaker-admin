import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { savePageInfo } from '../../redux'
import TreeView from '@material-ui/lab/TreeView'
import TreeItem from '@material-ui/lab/TreeItem'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import SettingsIcon from '@material-ui/icons/Settings'
import IconButton from '@material-ui/core/IconButton'
import ParamsDialog from '../params/params-dialog'
import PageParams from '../params/page-params'
import { Menu, MenuHeader } from '../../styles/mixin'
import styled from 'styled-components'

const PageMenu = () => {
  const activeIndex = useSelector(state => state.editor.activeIndex)
  const site = useSelector(state => state.editor.site)
  const page = site && site.pages[activeIndex]
  const dispatch = useDispatch()

  const [open, setOpen] = useState(false)
  const onClose = () => setOpen(false)
  const onSave = data => dispatch(savePageInfo(`pages[${activeIndex}]`, data))

  return (
    <Menu>
      {page && (
        <>
          <MenuHeader>
            <IconButton onClick={() => setOpen(!open)}>
              <SettingsIcon />
            </IconButton>
          </MenuHeader>

          <ParamsDialog open={open} defaultValues={page} onClose={onClose} onSave={onSave}>
            <PageParams page={page} />
          </ParamsDialog>

          <TreeView
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
          >
            <TreeItem nodeId='root' label={page.title}>
              {page.sections.map((section, i) => {
                return (
                  <TreeItem nodeId={i} label={section.type}>
                    {section.rows.map((row, i) => {
                      return (
                        <TreeItem nodeId={i} label={row.type}>
                          {row.blocks.map((block, i) => (
                            <TreeItem nodeId={i} label={block.type} />
                          ))}
                        </TreeItem>
                      )
                    })}
                  </TreeItem>
                )
              })}
            </TreeItem>
          </TreeView>
        </>
      )}
    </Menu>
  )
}

export default PageMenu
