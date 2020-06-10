import React from 'react'
import { ThemeProvider as StyledComponentsThemeProvider } from 'styled-components'
import { GlobalStyle } from './global-styles'
import {
  createMuiTheme,
  ThemeProvider as MuiThemeProvider,
} from '@material-ui/core/styles'

const Theme = ({ children }) => {
  const theme = {
    color: {
      primary: '#2f7208',
      secondary: '#456342',
      section: '#172a96',
      row: '#971c91',
      block: '#bd6716',
      bg: '#fafafa',
      font: 'black',
    },
    font: {
      primary: 'Balsamiq Sans, cursive',
    },
    container: {
      padding: '1.3rem 0.6rem',
    },
  }

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
