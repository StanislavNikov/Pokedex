let pokemonRepository = (function () {
  let t = [],
    e = 'https://pokeapi.co/api/v2/pokemon/?limit=150';
  const n = document.getElementById('searchBox');
  function o(e) {
    return 'object' == typeof e && 'name' in e
      ? t.push(e)
      : console.log('Please, enter valid values!');
  }
  function i(t) {
    let e = t.detailsUrl;
    return fetch(e)
      .then(function (t) {
        return t.json();
      })
      .then(function (e) {
        (t.imageUrl = e.sprites.front_default),
          (t.height = e.height),
          (t.weight = e.weight);
      })
      .catch(function (t) {
        console.error(t);
      });
  }
  function l(t) {
    i(t).then(function () {
      !(function (t) {
        let e = $('.modal-body'),
          n = $('.modal-title');
        n.empty(), e.empty();
        let o = $('<h1 class="text-capitalize">' + t.name + '</h1>'),
          i = $('<img class="modal-img" src="" >');
        i.attr('src', t.imageUrl);
        let l = $('<p>Height: ' + t.height + '</p>'),
          a = $('<p>Weight: ' + t.weight + '</p>');
        n.append(o), e.append(i), e.append(l), e.append(a);
      })(t);
    });
  }
  return (
    n.addEventListener('input', () => {
      let t = document.querySelectorAll('.list-group-item'),
        e = n.value.toLowerCase();
      t.forEach((t) => {
        t.innerText.toLowerCase().indexOf(e) > -1
          ? (t.style.display = '')
          : (t.style.display = 'none');
      });
    }),
    {
      add: o,
      getAll: function () {
        return t;
      },
      addListItem: function (t) {
        let e = document.querySelector('#pokeList'),
          n = document.createElement('li'),
          o = document.createElement('button');
        n.classList.add(
          'pokeListItem',
          'list-group-item',
          'col-md-4',
          'col-lg-3',
          'my-2'
        ),
          (o.innerText = t.name),
          o.classList.add(
            'pokeButton',
            'btn',
            'text-light',
            'text-capitalize',
            'text-center'
          ),
          o.setAttribute('data-toggle', 'modal'),
          o.setAttribute('data-target', '#pokedex'),
          n.appendChild(o),
          e.appendChild(n),
          o.addEventListener('click', function () {
            l(t);
          });
      },
      loadList: function () {
        return fetch(e)
          .then(function (t) {
            return t.json();
          })
          .then(function (t) {
            t.results.forEach(function (t) {
              o({ name: t.name, detailsUrl: t.url });
            });
          })
          .catch(function (t) {
            console.error(t);
          });
      },
      loadDetails: i,
      showDetails: l,
    }
  );
})();
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (t) {
    pokemonRepository.addListItem(t);
  });
});
