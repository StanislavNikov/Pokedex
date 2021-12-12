// Immediately Invoked Function Expresion (IIFE) depriving the functions inside from their "global-ness"
let pokemonRepository = (function() {

    // Declaring the pokemonList Array, the API variable, and the Modal variable

    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
    let modalContainer = document.querySelector('#modal-container');

    // Function for adding a new pokemon to the pokemonList Array 
    function add(pokemon) {
        return typeof pokemon === 'object' &&
            "name" in pokemon ?
            pokemonList.push(pokemon) :
            console.log("Please, enter valid values!");
    }

    // Function returns the entire Array
    function getAll() {
        return pokemonList;
    }

    // Function adds each new pokemon as an item with a button to the list
    function addListItem(pokemon) {
        let pokelist = document.querySelector('ul');
        let pokelistItem = document.createElement('li');
        let button = document.createElement('button');
        button.innerText = pokemon.name;
        button.classList.add('btn');
        pokelistItem.appendChild(button);
        pokelist.appendChild(pokelistItem);
        button.addEventListener('click', function() {
            showDetails(pokemon);
        });
    }

    // Function loads pokemons from the API and adds them to the Array
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

    // Function loads pokemon properties from the API
    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url).then(function(response) {
            return response.json();
        }).then(function(details) {
            item.imageUrl = details.sprites.front_default;
            item.height = (details.height / 10);
            item.weight = details.weight;
            item.types = details.types;
        }).catch(function(e) {
            console.error(e);
        });
    }

    // Function logs the details loaded from loadDetails
    function showDetails(pokemon) {
        loadDetails(pokemon).then(function() {
            showModal(pokemon);
        });
    }



    // Function shows modal
    function showModal(pokemon) {
        modalContainer.innerHTML = '';

        let modal = document.createElement('div');
        modal.classList.add('modal');

        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerHTML = '<img id = "btn-close" src = "../files/close-button.png" widht = "24px" height = "24px">'
        closeButtonElement.addEventListener('click', hideModal)

        let titleElement = document.createElement('h1');
        titleElement.innerText = ('Name: ') + pokemon.name;

        let heightElement = document.createElement('p');
        heightElement.innerText = ('Height: ') + pokemon.height + ('m');

        let imgElement = document.createElement('img');
        imgElement.classList.add('poke-img');
        imgElement.src = pokemon.imageUrl;

        // let contentElement = document.createElement('p');
        // contentElement.innerText = ('Types: ') + pokemon.types;

        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(heightElement);
        modal.appendChild(imgElement);
        // modal.appendChild(contentElement);


        // pokemon.types.forEach(item => {
        //     let contentElement = document.createElement('p');
        //     contentElement.innerText = ('Type: ') + item.type.name;
        //     modal.appendChild(contentElement);
        // });

        modal.appendChild(imgElement);
        modalContainer.appendChild(modal);

        modalContainer.classList.add('is-visible');
    }

    // Function hides modal
    function hideModal() {
        modalContainer.classList.remove('is-visible');
    }

    // Modal closes when we hit the Esc key from the keyboard
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    });

    modalContainer.addEventListener('click', (e) => {
        let target = e.target;
        if (target === modalContainer) {
            hideModal();
        }
    });


    // Function
    function showDialog(title, text) {
        showModal(title, text);

        // We have defined modalContainer here
        let modalContainer = document.querySelector('#modal-container');

        // We want to add a confirm and cancel button to the modal
        let modal = modalContainer.querySelector('.modal');

        let confirmButton = document.createElement('button');
        confirmButton.classList.add('modal-confirm');
        confirmButton.innerText = 'Confirm';

        let cancelButton = document.createElement('button');
        cancelButton.classList.add('modal-cancel');
        cancelButton.innerText = 'Cancel';

        modal.appendChild(confirmButton);
        modal.appendChild(cancelButton);

        // We want to focus the confirmButton so that the user can simply press Enter
        confirmButton.focus();
    }

    return {
        add: add,
        getAll: getAll,
        addListItem: addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
    };
})();

pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});