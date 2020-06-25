import React from 'react'
import { useSelector } from 'react-redux'
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components'
import { GlobalStyle } from './global-styles'
import { createMuiTheme, ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import { createTheme } from '@bit/mcmanus68.webmaker.factory.factory-theme'

const Theme = ({ children }) => {
  const site = useSelector(state => state.editor.site)

  const theme = site?.theme || createTheme()
  theme.color.section = '#172a96'
  theme.color.row = '#971c91'
  theme.color.block = '#bd6716'
  theme.color.error = 'red'
  theme.color.success = 'green'

  const muiTheme = createMuiTheme({
    palette: {
      primary: {
        main: theme.color.primary,
      },
      secondary: {
        main: theme.color.secondary,
      },
    },
  })

  return (
    <StyledComponentsThemeProvider theme={theme}>
      <GlobalStyle />
      <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>
    </StyledComponentsThemeProvider>
  )
}

export default Theme
