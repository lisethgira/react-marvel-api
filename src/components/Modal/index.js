import React from 'react'
import ProviderHero from '../ProviderHero/index'
import { FaRegWindowClose } from 'react-icons/fa'
import ListComics from './ListComics'
import styled from 'styled-components'
import Card from '../card'
import axios from 'axios'
import { getCredentials } from '../../api/credentials.js'


const ContainerDet = styled.section`
  display: flex;
  justify-content: space-around;
  & article:nth-child(1) {
    flex: 30% 0 0;
  }
  & article:nth-child(2) {
    flex: 70% 0 0;
  }

  @media screen and (max-width: ${props => props.theme.desktop}) {
    flex-wrap: wrap;
    & article:nth-child(1) {
      flex: 100% 0 0;
    }
    & article:nth-child(2) {
      flex: 100% 0 0;
    }
  }
`
const ContainerFlex = styled.article`
  display: flex;
  flex-direction: column;
`

const Text = styled.div``
const Title = styled.div`
  font-size: 1.8rem;
  font-weight: bold;
`

const ContainerModal = styled.div`
  position: fixed;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.4);
`
const BoxModal = styled.div`
  position: relative;
  padding: 20px;
  max-height: 90vh;
  overflow-y: auto;
  background: ${props => props.theme.secondary};
  & svg {
    color: ${props => props.theme.quaternary};
    font-size: 3rem;
  }
  @media screen and (min-width: ${props => props.theme.desktop}) {
    flex: 800px 0 0;
    margin-top: 50px;
  }

  @media screen and (max-width: ${props => props.theme.desktop}) {
    flex: 85% 0 0;
    margin: auto;
  }
  & div {
    padding: 5px;
  }
`
const Exit = styled.div`
  position: absolute;
  right: 0px;
  top: 0px;
`

export default class Modal extends React.Component {
  static contextType = ProviderHero;
  _isMounted = false;

  constructor (props) {
    super(props)
    this.state = {
      hero: null,
      loading: true,
      comics: []
    }
  }

  componentDidMount () {
    this._isMounted = true
    const hero = this.context.listHeroes.filter(
      hero => hero.id === this.context.modalIdHero
    )
    this.setState({ hero: hero[0] }, () => {
      if (hero.length > 0) {
        const url = `https://gateway.marvel.com:443/v1/public/characters/${this.state.hero.id}/comics`
        axios
          .get(url, {
            params: getCredentials()
          })
          .then(response => {
            if (this._isMounted) {
              this.setState({
                loading: false,
                comics: response.data.data.results
              })
            }
          })
          .catch(error => {
            if (this._isMounted) {
              this.setState({ loading: false, comics: [] })
            }
            console.log(error)
          })
      }
    })
  }

  componentWillUnmount () {
    this._isMounted = false
  }

  closeModal = event => {
    this.context.setModal({
      modalVisible: false,
      modalIdHero: null
    })
    this.setState({ loading: true, comics: [] })
  };

  render () {
    const { hero, comics, loading } = this.state
    return (
      <ContainerModal
        onClick={e => {
          if (e.target === e.currentTarget) this.closeModal(e)
        }}
      >
        <BoxModal>
          <Exit
            onClick={e => {
              this.closeModal(e)
            }}
          >
            <FaRegWindowClose />
          </Exit>
          {hero ? (
            <ContainerDet>
              <Card>{hero}</Card>
              <ContainerFlex>
                <Text>
                  <div><strong>Nombre:</strong>{hero.name}</div>
                </Text>
                <Text>
                  <div><strong>Descripción:</strong> {hero.description
                    ? hero.description
                    : 'Heroe sin Descripción'}</div>
                </Text>
                <Text>
                  <div><strong>Fecha de Modificación:</strong>{hero.modified}</div>
                </Text>
              </ContainerFlex>
            </ContainerDet>
          ) : (
            <div></div>
          )}
          {!loading ? <ListComics comics={comics} /> : <div>Cargando...</div>}
        </BoxModal>
      </ContainerModal>
    )
  }
}
