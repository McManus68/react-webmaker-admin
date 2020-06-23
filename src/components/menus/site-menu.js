import React, { useState } from 'react'
import { useForm, FormContext } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { saveSiteInfo, updateSite } from '../../redux'
import Button from '@material-ui/core/Button'
import SettingsIcon from '@material-ui/icons/Settings'
import IconButton from '@material-ui/core/IconButton'
import SiteParams from '../params/site-params'
import ParamsDialog from '../params/params-dialog'
import styled from 'styled-components'
import { Menu, MenuHeader, MenuControls } from '../../styles/mixin'

const SiteMenu = () => {
  const site = useSelector(state => state.editor.site)
  const activeIndex = useSelector(state => state.editor.activeIndex)

  const dispatch = useDispatch()
  const [open, setOpen] = useState(false)
  const onClose = () => setOpen(false)
  const onSave = data => dispatch(saveSiteInfo(data))

  return (
    <Menu>
      {site && (
        <>
          <MenuHeader>
            <IconButton onClick={() => setOpen(!open)}>
              <SettingsIcon />
            </IconButton>
          </MenuHeader>

          <label>{site.id}</label>
          <ParamsDialog open={open} defaultValues={site} onClose={onClose} onSave={onSave}>
            <SiteParams site={site} />
          </ParamsDialog>

          <MenuControls>
            <Button variant='contained' color='secondary' onClick={() => dispatch(updateSite)}>
              Save
            </Button>
          </MenuControls>
        </>
      )}
    </Menu>
  )
}

export default SiteMenu
