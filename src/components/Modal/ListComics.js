import React from 'react'
import PropTypes from 'prop-types'

import styled from 'styled-components'
const Subtitle = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
`
const Comic = styled.div`
  font-size: 1.1rem;
`
const ListStories = styled.ul`
  list-style-type: none;
`

export default Object.assign(
  props => {
    return (
      <div>
        <Subtitle>Listado de Comics y Series</Subtitle>
        <ul>
          {props.comics.map(element => (
            <li key={`list-${element.id}`}>
              <Comic key={`comic-${element.id}`}>{element.title}</Comic>
              <ListStories key={`storie-${element.id}`}>
                {element.stories.items.map((storie, index) => (
                  <li key={`${element.id}-${index}`}>- {storie.name}</li>
                ))}
              </ListStories>
            </li>
          ))}
        </ul>
      </div>
    )
  },
  {
    propTypes: {
      comics: PropTypes.array
    }
  }
)
