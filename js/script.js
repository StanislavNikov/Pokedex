let pokemonList = [
    {name: 'Bulbasaur', height: 0.7, type: ['grass', 'poison']},
    {name: 'Ivysaur', height: 1, type: ['grass', 'poison']},
    {name: 'Venusaur', height: 2, type: ['grass', 'poison']}
]

// Looping through the pokemonList array
/* for (let i = 0; i < pokemonList.length; i++) */
pokemonList.forEach(function(pokemon){
    if (pokemon.height < 2) {
        document.write(`${pokemon.name} (height: ${pokemon.height})<p></p>`)
    } else
    document.write(`${pokemon.name} (height: ${pokemon.height}) - "Wow! That's BIG!"<p></p>`)
})
console.log(pokemonList)