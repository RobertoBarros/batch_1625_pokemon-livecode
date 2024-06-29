import Mustache from 'mustachejs'
const cardTemplate = document.getElementById('cardTemplate').innerHTML
const cardsContainer = document.getElementById('cardsContainer')

const infoTemplate = document.getElementById('infoTemplate').innerHTML
const infoContainer = document.getElementById('infoContainer')

const url = `https://pokeapi.co/api/v2/pokemon`

fetch(url)
  .then(response => response.json())
  .then((data) => {
    data.results.forEach((result) => {
      const pokemonURL = result.url
      fetch(pokemonURL)
        .then(response => response.json())
        .then((pokemonData) => {
          const pokemon = {
            name: pokemonData.name,
            types: pokemonData.types.map((aType) => {return aType.type.name}).join(', ')
            ,
            imageURL: pokemonData.sprites.front_default
          }

          const output = Mustache.render(cardTemplate, pokemon)
          cardsContainer.insertAdjacentHTML('beforeend', output)

          const link = document.getElementById(pokemonData.name)
          link.addEventListener('click', () => {
            const details = {
              name: pokemonData.name,
              imageURL: pokemonData.sprites.front_shiny,
              abilities: pokemonData.abilities.map((anAbility) => {return anAbility.ability.name}).join(', ')
            }
            const detailOutput = Mustache.render(infoTemplate, details)
            infoContainer.innerHTML = detailOutput
          })

        })
    })
  })
