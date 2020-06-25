import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { saveSiteInfo, updateSite, removeSite, saveTheme } from '../../redux'
import Button from '@material-ui/core/Button'
import DeleteIcon from '@material-ui/icons/Delete'
import SaveIcon from '@material-ui/icons/Save'
import ThemeIcon from '@material-ui/icons/ColorLens'
import SettingsIcon from '@material-ui/icons/Settings'
import IconButton from '@material-ui/core/IconButton'
import SiteParams from '../params/site-params'
import ThemeParams from '../params/theme-params'
import ParamsDialog from '../params/params-dialog'
import ConfirmDialog from '../ui/confirm-dialog'
import { Menu, MenuHeader, MenuControls } from '../../styles/mixin'
import styled from 'styled-components'

const StyledDeleteIcon = styled(DeleteIcon)`
  color: ${props => props.theme.color.error};
`

const SiteMenu = () => {
  const site = useSelector(state => state.editor.site)
  const dispatch = useDispatch()
  const [openParamDialog, setOpenParamDialog] = useState(false)
  const [openThemeDialog, setOpenThemeDialog] = useState(false)
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false)
  const onCloseParamDialog = () => setOpenParamDialog(false)
  const onCloseDeleteDialog = () => setOpenDeleteDialog(false)
  const onCloseThemeDialog = () => setOpenThemeDialog(false)

  const onSaveParam = data => dispatch(saveSiteInfo(data))
  const onRemoveSite = () => dispatch(removeSite(site.id))
  const onSaveTheme = data => dispatch(saveTheme(data))

  return (
    <Menu>
      {site && (
        <>
          <MenuHeader>
            <IconButton onClick={() => setOpenParamDialog(!openParamDialog)}>
              <SettingsIcon />
            </IconButton>
            <IconButton onClick={() => setOpenThemeDialog(!openThemeDialog)}>
              <ThemeIcon />
            </IconButton>
            <IconButton onClick={() => dispatch(updateSite(site))}>
              <SaveIcon />
            </IconButton>
            <IconButton onClick={() => setOpenDeleteDialog(!openDeleteDialog)}>
              <StyledDeleteIcon />
            </IconButton>
          </MenuHeader>

          <label>{site.id}</label>
          <ParamsDialog
            open={openParamDialog}
            defaultValues={site}
            onClose={onCloseParamDialog}
            onSave={onSaveParam}
          >
            <SiteParams site={site} />
          </ParamsDialog>

          <ParamsDialog
            title='Theme editor'
            open={openThemeDialog}
            defaultValues={site.theme}
            onClose={onCloseThemeDialog}
            onSave={onSaveTheme}
          >
            <ThemeParams />
          </ParamsDialog>

          <ConfirmDialog
            open={openDeleteDialog}
            title='The site will be definitively deleted !'
            description='Please check before confirm the deletion'
            onClose={onCloseDeleteDialog}
            onConfirm={onRemoveSite}
          />

          <MenuControls></MenuControls>
        </>
      )}
    </Menu>
  )
}

export default SiteMenu
