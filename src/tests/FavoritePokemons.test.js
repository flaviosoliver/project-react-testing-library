import React from 'react';
import '@testing-library/jest-dom';
import { FavoritePokemons } from '../components';
import renderWithRouter from './renderWithRouter';
import { pokemons } from './pokeData';

describe('Testando o arquivo FavoritePokemons.js', () => {
  it('Teste se exibe No favorite pokemon found, caso não tenha favoritos', () => {
    const { getByText } = renderWithRouter(
      <FavoritePokemons />,
    );

    const noFavorite = getByText(/No favorite pokemon found/);
    expect(noFavorite).toBeInTheDocument();
  });

  it('Teste se é exibido todos os cards de pokémons favoritados', () => {
    const { getByText } = renderWithRouter(
      <FavoritePokemons pokemons={ pokemons } />,
    );

    const pokemonCheck1 = getByText('Pikachu');
    expect(pokemonCheck1).toBeInTheDocument();
    const pokemonCheck2 = getByText('Ekans');
    expect(pokemonCheck2).toBeInTheDocument();
  });

  it('Teste se Não é exibido nenhum card de pokémon não favoritado', () => {
    const { queryByText } = renderWithRouter(
      <FavoritePokemons pokemons={ pokemons } />,
    );

    const pokemonCheck1 = queryByText('Charmander');
    expect(pokemonCheck1).toBeNull();
    const pokemonCheck2 = queryByText('Alakazam');
    expect(pokemonCheck2).toBeNull();
  });
});
