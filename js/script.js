let pokemonRepository = (function() {
    let pokemonList = [
        {name: 'Bulbasaur', height: 0.7, type: ['grass', 'poison']},
        {name: 'Ivysaur', height: 1, type: ['grass', 'poison']},
        {name: 'Venusaur', height: 2, type: ['grass', 'poison']}
    ]    
        // function add(pokemon) { 
        //     return (typeof pokemon === 'object') ? (Object.keys(pokemon) === Object.keys(pokemonList) ? pokemonList.push(pokemon): 
        //     document.write("Please, enter valid values!")) :
        //     document.write("Please, enter valid values!") 
        // }          
        function add(pokemon) {
            return (typeof pokemon === 'object') ? 
            pokemonList.push(pokemon) : alert("Please, enter valid values!");
        }
        function getAll() {
            return pokemonList;
        }
        return {
            add: add,
            getAll: getAll
        };
})()
// Looping through the pokemonList array
/* for (let i = 0; i < pokemonList.length; i++) */
pokemonRepository.getAll().forEach(function(pokemon){
    if (pokemon.height < 2) {
        document.write(`${pokemon.name} (height: ${pokemon.height})<p></p>`)
    } else
    document.write(`${pokemon.name} (height: ${pokemon.height}) - "Wow! That's BIG!"<p></p>`)
    })
    