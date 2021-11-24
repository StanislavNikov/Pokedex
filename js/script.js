let pokemonRepository = (function() {
    let pokemonList = [
        { name: 'Bulbasaur', height: 0.7, type: ['grass', 'poison'] },
        { name: 'Ivysaur', height: 1, type: ['grass', 'poison'] },
        { name: 'Venusaur', height: 2, type: ['grass', 'poison'] }
    ]

    function add(pokemon) {
        return (typeof pokemon === 'object' &&
                "name" in pokemon &&
                "height" in pokemon &&
                "type" in pokemon) ?
            pokemonList.push(pokemon) :
            alert("Please, enter valid values!");
    };

    function getAll() {
        return pokemonList;
    };

    function showDetails(pokemon) {
        console.log(pokemon)
    }

    function addListItem(pokemon) {
        let pokelist = document.querySelector('ul');
        let pokelistItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('btn');
        pokelistItem.appendChild(button);
        pokelist.appendChild(pokelistItem);
        button.addEventListener('click', function() {
            showDetails(pokemon)
        })
    };
    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem
    };
})()

console.log(pokemonRepository.getAll());
// Adding a pokemon to the pokemonList array
pokemonRepository.add({ name: 'Pikachu', height: 0.3, type: ['electric'] });
// Looping through the pokemonList array
pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
})