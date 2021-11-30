let pokemonRepository = (function() {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150'

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
        console.log(pokemon);
    };

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

        function loadList() {
            return fetch(apiUrl).then(function(response) {
                return response.json();
            }).then(function(json) {
                json.results.forEach(function(item) {
                    let pokemon = {
                        name: item.name,
                        detailsUrl: item.url
                    };
                    add(pokemon);
                });
            }).catch(function(e) {
                console.error(e);
            })
        }
    };

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList
    };
})();

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});
// Adding a pokemon to the pokemonList array
// pokemonRepository.add({ name: 'Pikachu', height: 0.3, type: ['electric'] });
// Looping through the pokemonList array