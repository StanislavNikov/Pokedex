// Immediately Invoked Function Expresion (IIFE) depriving the functions inside from their "global-ness"
let pokemonRepository = (function () {
  // Declaring the pokemonList Array, the API variable, and the Modal variable

  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  // Function for adding a new pokemon to the pokemonList Array
  function add(pokemon) {
    return typeof pokemon === 'object' && 'name' in pokemon
      ? pokemonList.push(pokemon)
      : console.log('Please, enter valid values!');
  }

  // Function returns the entire Array
  function getAll() {
    return pokemonList;
  }

  // Function adds each new pokemon as an item with a button to the list
  function addListItem(pokemon) {
    let pokelist = document.getElementById('pokeList'),
      pokelistItem = document.createElement('li'),
      button = document.createElement('button');

    pokelistItem.classList.add(
      'pokeListItem',
      'list-group-item',
      'col-md-4',
      'col-lg-3',
      'my-2'
    );

    button.classList.add('pokeButton', 'btn', 'text-light', 'text-capitalize');
    button.innerText = pokemon.name;

    pokelistItem.appendChild(button);
    pokelist.appendChild(pokelistItem);
    button.addEventListener('click', function () {
      showDetails(pokemon);
    });
  }

  // Function loads pokemons from the API and adds them to the Array
  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  // Function loads pokemon properties from the API
  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.weight = details.weight;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  // Function logs the details loaded from loadDetails
  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
      showModal(pokemon);
    });
  }

  function showModal(pokemon) {
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');
    modalTitle.empty();
    modalBody.empty();

    let nameElement = $(
      '<h1 class="text-capitalize">' + pokemon.name + '</h1>'
    );
    let imageElement = $('<img class="modal-img" src="" >');
    imageElement.attr('src', pokemon.imageUrl);
    let heightElement = $('<p>' + 'Height: ' + pokemon.height + '</p>');
    let weightElement = $('<p>' + 'Weight: ' + pokemon.weight + '</p>');

    modalTitle.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(heightElement);
    modalBody.append(weightElement);

    $('#pokedex').modal();
  }

  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
