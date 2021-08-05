import React, { useState } from 'react'
import styled from 'styled-components'
import ProviderHero from './ProviderHero/index'
import ListItems from './ListItems'
import NavBar from './NavBar/index'
import Modal from './Modal/index'

const MainContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const Container = styled.div`
  margin: auto;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  nav {
    flex: auto 0 0;
  }
  @media screen and (min-width: ${props => props.theme.desktop}) {
    min-width: 700px;
    margin: auto;
  }
`

const ContainerList = styled.div`
  flex: 1;
  align-content: flex-start;
  display: flex;
  padding-top: 5px;
  flex-direction: column;
  justify-content: flex-start;
`

export default () => {
  const [listHeroes, setHeroes] = useState([])
  const [modal, setModal] = useState({
    modalVisible: false,
    modalIdHero: null
  })

  return (
    <ProviderHero.Provider
      value={{
        listHeroes,
        setHeroes,
        ...modal,
        setModal
      }}
    >
      <MainContainer>
        <Container>
          <NavBar />
          <ContainerList>
            <ListItems />
          </ContainerList>
        </Container>
        {modal.modalVisible ? <Modal /> : null}
      </MainContainer>
    </ProviderHero.Provider>
  )
}
