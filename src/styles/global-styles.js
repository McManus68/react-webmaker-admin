import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    }
    html {
      font-family: ${props => props.theme.font.primary};
      color: ${props => props.theme.color.font};
      scroll-behavior: smooth;
    }
    body {
      background-color: ${props => props.theme.color.bg};
      overflow-x: hidden;
    }
    .container {
      max-width: 1140px !important;
    }
  `
