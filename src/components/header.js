import React from 'react'
import PropTypes from 'prop-types'
import { Container } from '../styles/mixin'
import styled from 'styled-components'

const StyledHeader = styled.div`
  background-color: #282c34;
  height: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
`

const Header = ({ items }) => {
  return (
    <StyledHeader>
      <Container></Container>
    </StyledHeader>
  )
}

export default Header

Header.propTypes = {
  items: PropTypes.array,
}
