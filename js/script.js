let pokemonList = [
    {name: 'Bulbasaur', height: 0.7, type: ['grass', 'poison']},
    {name: 'Ivysaur', height: 1, type: ['grass', 'poison']},
    {name: 'Venusaur', height: 2, type: ['grass', 'poison']}
]
for (let i = 0; i < pokemonList.length; i++) {
    if (pokemonList[i].height < 2) {
        document.write(`${pokemonList[i].name} (height: ${pokemonList[i].height})</p>`)
    } else
    document.write(`${pokemonList[i].name} (height: ${pokemonList[i].height}) - "Wow! That's BIG!"</p>`)
}
console.log(pokemonList)