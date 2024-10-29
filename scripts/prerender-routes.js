
const TOTAK_POKEMONS = 10;
const TOTAL_PAGES = 5;

/**
 * node --watch scripts/prerender-routes.js
 */
(async () => {
  const fs = require('fs');

  // Crear pokemones por ID's
  const pokemonIds = Array.from({ length: TOTAK_POKEMONS }, (_, i) => i + 1);
  let fileContent = pokemonIds.map((id) => `/pokemons/${id}`).join('\n');


  // Páginas de Pókemones
  for (let i = 1; i <= TOTAL_PAGES; i++) {
    fileContent += `\n/pokemons/page/${i}`;
  }

  // Páginas por nombre
  const pokemonNameList = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${TOTAK_POKEMONS}&offset=0`)
    .then((res) => res.json())
    .then((pokemons) => pokemons.results.map((pokemon) => pokemon.name));

  pokemonNameList.forEach((name) => {
    fileContent += `\n/pokemons/${name}`;
  });

  fs.writeFileSync('routes.txt', fileContent);
  console.log('Routes file created');
})();
