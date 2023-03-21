import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import { Pokemon } from '../components';
import { pokemons } from './pokeData';

describe('Testando o arquivo Pokemon.js', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    const { getByTestId, getAllByRole } = renderWithRouter(
      <Pokemon
        pokemon={ pokemons[0] }
        isFavorite={ false }
      />,
    );
    const pokemonName = getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent(/Pikachu/i);
    const pokemonType = getByTestId('pokemonType');
    expect(pokemonType).toHaveTextContent(/Electric/i);
    const pokemonWeight = getByTestId('pokemon-weight');
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');
    const pokemonImage = getAllByRole('img');
    const pokemonImageSrc = 'https://cdn.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    expect(pokemonImage[0].src).toBe(pokemonImageSrc);
    expect(pokemonImage[0].alt).toBe('Pikachu sprite');
  });

  it('Teste no card do Pokémon escolhido tem um link para exibir detalhes', () => {
    const { getByRole } = renderWithRouter(
      <Pokemon
        pokemon={ pokemons[0] }
        isFavorite={ false }
      />,
    );
    const pokeDetails = getByRole('link', { name: /More details/i });
    expect(pokeDetails).toHaveAttribute('href', '/pokemons/25');
  });

  it('Teste se ao clicar no link do Pokémon, segue para exibir detalhes', () => {
    const { getByText, history, getByRole } = renderWithRouter(
      <Pokemon
        pokemon={ pokemons[0] }
        isFavorite={ false }
      />,
    );
    const home = history.location.pathname;
    expect(home).toBe('/');

    const pathDetails = getByRole('link', { href: '/pokemons/25' });
    fireEvent.click(pathDetails);

    const pokeDetails = getByText(/More details/i);
    expect(pokeDetails).toBeInTheDocument();
  });

  it('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    const { getAllByRole } = renderWithRouter(
      <Pokemon
        pokemon={ pokemons[0] }
        isFavorite={ { 25: true } }
      />,
    );
    const images = getAllByRole('img');
    expect(images[1].src.split('http://localhost')[1]).toBe('/star-icon.svg');
    expect(images[1].alt).toBe('Pikachu is marked as favorite');
  });
});
