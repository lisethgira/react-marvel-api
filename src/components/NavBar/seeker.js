import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ProviderHero from '../ProviderHero/index'
import { getCredentials } from '../../api/credentials.js'
import axios from 'axios'



const Lupa = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`
const ContainerInput = styled.div`
  position: relative;
  flex-basis: 70%;
  input {
    width: 100%;
    height: 1.5rem;
    font-size: 1rem;
    padding: 0.5rem;
    padding: 0.5rem 0.5rem 10px 35px;
  }

  @media screen and (max-width: ${props => props.theme.desktop}) {
    margin-top: 5px;
    flex-basis: 100%;
    order: 2;
    input {
      width: 100%;
    }
  }
  ${Lupa} {
    position: absolute;
    border-right: 1.5px solid #eee;
    top: 3px;
    img {
      margin: auto;
      padding: 3px;
      width: 25px;
    }
  }
`

export default class Seeker extends React.Component {
  static contextType = ProviderHero;

  componentDidMount() {
    this.getHeroes('')
  }

  // Rutina que trae personajes
  // Se ejecuta al inciar y cada vez que se escribe en el buscador
  getHeroes(HeroesName) {

    const limit = 12
    const url = 'https://gateway.marvel.com:443/v1/public/characters'

    let params = {
      ...getCredentials(),
      limit
    }

    if (HeroesName !== '') {
      params = { ...params, nameStartsWith: HeroesName }
    }

    axios
      .get(url, {
        params: params
      })
      .then(res => {
        this.context.setHeroes(res.data.data.results)
      })
      .catch(error => {
        this.context.setHeroes([])
        console.log(error)
      })
  }

  render() {
    return (
      <div>
        <ContainerInput>
          <Lupa>
            <img src={require('../../assets/images/lupa.jpg')} alt="search" />
          </Lupa>
          {/* actualizo la busqueda con cada cambio */}
          <input
            autoFocus
            onChange={e => this.getHeroes(e.target.value)}
            label="buscador de heroes"
            helperText={"Digita el nombre del personaje a buscar."}
          />
        </ContainerInput>
        </div>

    )
  }
}
