import React, { useContext } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import Card from './card'
import ProviderHero from './ProviderHero/index'

// Contenedor de Cards
const ContainerHero = styled.section`
  flex: 1;
  align-content: flex-start;
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  background: ${props => props.theme.secondary};
  flex-wrap: wrap;
  padding: 5px;

  @media screen and (min-width: ${props => props.theme.desktop}) {
    article {
      flex: 15% 0 0;
    }
  }

  @media screen and (max-width: ${props =>
      props.theme.desktop}) and (min-width: ${props => props.theme.tablet}) {
    article {
      flex: 35% 0 0;
    }
  }

  @media screen and (max-width: ${props =>
      props.theme.tablet}) and (min-width: ${props => props.theme.mobile}) {
    article {
      flex: 50% 0 0;
    }
  }

  @media screen and (max-width: ${props => props.theme.mobile}) {
    article {
      flex: 100% 0 0;
    }
  }
`

export default Object.assign(
  () => {
    const providerHero = useContext(ProviderHero)

    return (
      <ContainerHero>
        {providerHero.listHeroes.map(element => (
          <Card key={String(element.id)}>{element}</Card>
        ))}
      </ContainerHero>
    )
  },
  { propTypes: { children: PropTypes.node } }
)
