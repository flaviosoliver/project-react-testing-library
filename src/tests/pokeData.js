const pokemons = [
  {
    id: 25,
    name: 'Pikachu',
    type: 'Electric',
    averageWeight: { value: '6.0', measurementUnit: 'kg' },
    image: 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Kanto Viridian Forest',
        map: 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
      },
      {
        location: 'Kanto Power Plant',
        map:
          'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
      },
    ],
    summary: 'This intelligent Pokémon...',
  },
  {
    id: 23,
    name: 'Ekans',
    type: 'Poison',
    averageWeight: { value: '6.9', measurementUnit: 'kg' },
    image: 'https://cdn.bulbagarden.net/upload/1/18/Spr_5b_023.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Ekans_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Goldenrod Game Corner',
        map:
          'https://cdn.bulbagarden.net/upload/e/ec/Johto_Goldenrod_City_Map.png',
      },
    ],
    summary: 'It can freely detach...',
  },
];

const isPokemonFavoriteById = {
  4: false,
  10: false,
  23: true,
  25: true,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};

module.exports = { pokemons, isPokemonFavoriteById };
