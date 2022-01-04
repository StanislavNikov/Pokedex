// Immediately Invoked Function Expresion (IIFE) depriving the functions inside from their "global-ness"
let pokemonRepository = (function () {
  // Declaring the pokemonList Array, the API variable, and the Modal variable

  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

  const searchBox = document.getElementById('searchBox');
  searchBox.addEventListener('input', () => {
    let pokeSearch = document.querySelectorAll('.list-group-item');
    let pokeString = searchBox.value.toLowerCase();

    pokeSearch.forEach((pokemon) => {
      if (pokemon.innerText.toLowerCase().indexOf(pokeString) > -1) {
        pokemon.style.display = '';
      } else {
        pokemon.style.display = 'none';
      }
    });
  });

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
    let pokelist = document.querySelector('#pokeList'),
      pokelistItem = document.createElement('li'),
      button = document.createElement('button');

    pokelistItem.classList.add(
      'pokeListItem',
      'list-group-item',
      'col-md-4',
      'col-lg-3',
      'my-2'
    );
    button.innerText = pokemon.name;
    button.classList.add(
      'pokeButton',
      'btn',
      'text-light',
      'text-capitalize',
      'text-center'
    );

    button.setAttribute('data-toggle', 'modal');
    button.setAttribute('data-target', '#pokedex');

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
        item.types = details.types;
        item.abilities = details.abilities;
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
      '<h2 class="text-capitalize">' + pokemon.name + '</h2>'
    );
    let modalTitleInfoContainer = $('<div class="d-flex ml-1">');
    let heightElement = $('<h3 class="text-black text-uppercase pr-3 m-0">' + 'Height: ' + '<span class="font-weight-bold">' + pokemon.height + '</span>' + '</h3>');
    let weightElement = $('<h3 class="text-black text-uppercase m-0">' + 'Weight: ' + '<span class=" font-weight-bold">' + pokemon.weight + '</span>' + '</h3>');
    
    let imageElement = $('<img class="modal-img my-2 mb-4" src="" >');
    imageElement.attr('src', pokemon.imageUrl);

    let abilitiesArr = [],
        typesArr = [];
    // Looping through details.types
    Object.keys(pokemon.types).forEach(type => {
      typesArr.push(" " + pokemon.types[type].type.name);
    })
    let typesElemenet = $('<p class="text-uppercase text-warning m-0 ml-1">' + 'Types: ' + '<span class="text-info font-weight-bold text-capitalize">' + typesArr + '</span>' + '</p>');
    // Looping through details.abilities
    Object.keys(pokemon.abilities).forEach(ability => {
      abilitiesArr.push(" " + pokemon.abilities[ability].ability.name);
    })
    let abilitiesElement = $('<p class="text-uppercase text-warning m-0 ml-1">' + 'Abilities: ' + '<span class="text-info font-weight-bold text-capitalize">' + abilitiesArr + '</span>' + '</p>');
    
    modalTitle.append(nameElement);      
    modalTitleInfoContainer.append(heightElement);
    modalTitleInfoContainer.append(weightElement);  
    modalTitle.append(modalTitleInfoContainer);
    modalBody.append(imageElement);  
    modalBody.append(typesElemenet);
    modalBody.append(abilitiesElement);
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
