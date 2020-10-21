import {useState, useEffect} from 'react';

export const useSelection = (initialChoice) => {
  const [navSelection, setNavSelection] = useState(initialChoice)

  const setChoice = (choice) => {
    setNavSelection(null)
    setNavSelection(choice)
  }
  return [navSelection, setChoice]
}

export const useFavorites = (initial) => {
  const [favorites, setFavorite] = useState(initial)

  const addToFavorites = (choice) => {
    setFavorite([...favorites, choice])
  }
  return [favorites, addToFavorites]
}


