import React from 'react'
import styled from 'styled-components'
import ButtonTheme from './ButtonTheme'
import Seeker from './seeker'

const Logo = styled.div``
const ContainerButton = styled.div``
// Cards
const NavBar = styled.nav`
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: ${props => props.theme.desktop}) {
    flex-wrap: wrap;
  }
  align-items: center;
  padding: 5px;
  background: ${props => props.theme.primary};

  ${ContainerButton} {
    flex-basis: 30%;
    display: flex;
    justify-content: space-around;
  }
  ${Logo} {
    flex: auto 0 0;
    padding-right: 15px;
    img {
      max-width: 100px;
    }
  }
`

export default Object.assign(
  () => (
    <NavBar>
      <Logo>
        <img src={require('../../assets/images/logo-marvel.png')} alt="logo" />
      </Logo>
      <Seeker />
      <ContainerButton>
        <ButtonTheme />
      </ContainerButton>
    </NavBar>
  ),
  { displayName: 'NavBar' }
)
