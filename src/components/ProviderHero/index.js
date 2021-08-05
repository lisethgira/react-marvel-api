import React from 'react'

// Maneja la lista de caracteres a mostrar en la pantalla inicio
// Maneja el estado del modal(on/off) y su contenido

const ProviderHero = React.createContext({
  listHeroes: [],
  setHeroes: () => {},
  modalVisible: false,
  modalIdHero: null
})
export default ProviderHero
