import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { savePageInfo, removePage, addPage } from '../../redux'
import TreeView from '@material-ui/lab/TreeView'
import TreeItem from '@material-ui/lab/TreeItem'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import SettingsIcon from '@material-ui/icons/Settings'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'
import IconButton from '@material-ui/core/IconButton'
import ParamsDialog from '../params/params-dialog'
import ConfirmDialog from '../ui/confirm-dialog'
import PageParams from '../params/page-params'
import { Menu, MenuHeader } from '../../styles/mixin'
import styled from 'styled-components'

const PageMenu = () => {
  const activeIndex = useSelector(state => state.editor.activeIndex)
  const site = useSelector(state => state.editor.site)
  const page = site && site.pages[activeIndex]
  const dispatch = useDispatch()

  const [openParamDialog, setOpenParamDialog] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const onCloseParamDialog = () => setOpenParamDialog(false)
  const onCloseDeleteDialog = () => setOpenDeleteDialog(false)
  const onSaveParam = data => dispatch(savePageInfo(`pages[${activeIndex}]`, data))
  const onDeletePage = () => dispatch(removePage(activeIndex))

  const StyledDeleteIcon = styled(DeleteIcon)`
    color: ${props => props.theme.color.error};
  `

  return (
    <Menu>
      {site && (
        <>
          <MenuHeader>
            <IconButton onClick={() => setOpenParamDialog(!openParamDialog)}>
              <SettingsIcon />
            </IconButton>
            <IconButton onClick={() => dispatch(addPage('NEW_PAGE'))}>
              <AddIcon />
            </IconButton>
            <IconButton>
              <StyledDeleteIcon onClick={() => setOpenDeleteDialog(!openDeleteDialog)} />
            </IconButton>
          </MenuHeader>

          <ParamsDialog
            open={openParamDialog}
            defaultValues={page}
            onClose={onCloseParamDialog}
            onSave={onSaveParam}
          >
            <PageParams page={page} />
          </ParamsDialog>

          <TreeView
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpandIcon={<ChevronRightIcon />}
          >
            <TreeItem nodeId='root' label={page?.title}>
              {page &&
                page.sections.map((section, i) => {
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

      <ConfirmDialog
        open={openDeleteDialog}
        title='The page will be deleted. Are you sure you want to process?'
        description='Please check before confirm the deletion'
        onClose={onCloseDeleteDialog}
        onConfirm={onDeletePage}
      />
    </Menu>
  )
}

export default PageMenu
