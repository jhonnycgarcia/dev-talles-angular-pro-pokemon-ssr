
const TOTAK_POKEMONS = 10;
const TOTAL_PAGES = 5;

/**
 * node --watch scripts/prerender-routes.js
 */
(async () => {
  console.log('Hello world');

  const fs = require('fs');

  // Crear pokemones por ID's
  const pokemonIds = Array.from({ length: TOTAK_POKEMONS }, (_, i) => i + 1);
  let fileContent = pokemonIds.map((id) => `/pokemons/${id}`).join('\n');


  // Páginas de Pókemones
  for (let i = 1; i <= TOTAL_PAGES; i++) {
    fileContent += `\n/pokemons/page/${i}`;
  }

  fs.writeFileSync('routes.txt', fileContent);
  console.log('Routes file created');
})();
