import React, { useContext } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import ProviderHero from "./ProviderHero/index";


const ContainerHero = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin: auto;
  padding: 2px;
  width: min-content;
  max-width: 200px;
  background: ${props => props.theme.primary};
  border-radius: 5px;

  border: 0.5px solid ${props => props.theme.tertiary};
  &:hover {
    cursor: pointer;
    background: ${props => props.theme.tertiary};
  }
  &:hover div {
    max-height: 10rem;
    height: auto;
    min-height: auto;
    overflow: none;
    color: white;
    font-weight: bold;
  }
  div {
    padding: 4px;
    max-height: 1.5rem;
    min-height: 1.5rem;
    overflow: hidden;
  }
`;

// Cards
const Card = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom:5px;
  img {
    margin: auto;
  }
`;

export default Object.assign(
  props => {
    const providerHero = useContext(ProviderHero);
    const { name, thumbnail, id } = props.children;
    // genero la ruta de la imagen
    const imagen = `${thumbnail.path}/portrait_xlarge.${thumbnail.extension}`;
    return (
      <Card>
        <ContainerHero
          onClick={() => {
            providerHero.setModal({
              modalVisible: true,
              modalIdHero: id
            });
          }}
        >
          <img src={imagen} alt="Hero" />
          <div><strong>{name}</strong></div>
        </ContainerHero>
      </Card>
    );
  },
  {
    propTypes: {
      name: PropTypes.string,
      thumbnail: PropTypes.string,
      id: PropTypes.string
    }
  }
);
