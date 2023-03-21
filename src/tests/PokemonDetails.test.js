import React from 'react';
import { fireEvent } from '@testing-library/react';
import { PokemonDetails } from '../components';
import { pokemons, isPokemonFavoriteById } from './pokeData';
import renderWithRouter from './renderWithRouter';

describe('Testando o arquivo PokemonDetails.js', () => {
  it('Teste se as informações do Pokémon selecionado são mostradas na tela', () => {
    const { getByText, queryByRole, history } = renderWithRouter(
      <PokemonDetails
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
        match={ { params: { id: '25' } } }
        onUpdateFavoritePokemons={ () => {} }
      />,
    );
    history.push('/pokemons/25');

    const pokemonTitle = getByText('Pikachu Details');
    const linkDetails = queryByRole('link', { href: '/pokemons/25' });
    const pokemonSummary = queryByRole('heading', { name: 'Summary' });
    const pokemonDescription = getByText(/This intelligent Pokémon/i);
    expect(pokemonTitle).toBeInTheDocument();
    expect(linkDetails).toBeNull();
    expect(pokemonSummary).toBeInTheDocument();
    expect(pokemonDescription).toBeInTheDocument();
  });

  it('Teste se existe os mapas contendo as localizações do pokémon', () => {
    const { history, getByText, getAllByRole } = renderWithRouter(
      <PokemonDetails
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
        match={ { params: { id: '25' } } }
        onUpdateFavoritePokemons={ () => {} }
      />,
    );
    history.push('/pokemons/25');

    const pokemonTitle = getByText(/Game Locations of Pikachu/i);
    const pokemonImage = getAllByRole('img', {
      name: 'Pikachu location',
    });
    expect(pokemonTitle).toBeInTheDocument();
    expect(pokemonImage.length.toString()).toBe('2');
    expect(pokemonImage[0].nextSibling).toHaveTextContent(/Kanto Viridian Forest/i);
    expect(pokemonImage[0]).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(pokemonImage[0]).toHaveAttribute('alt', 'Pikachu location');
    expect(pokemonImage[1].nextSibling).toHaveTextContent(/Kanto Power Plant/i);
    expect(pokemonImage[1]).toHaveAttribute('src', 'https://cdn.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(pokemonImage[1]).toHaveAttribute('alt', 'Pikachu location');
  });

  it('Teste se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    const { history, queryByRole, queryAllByRole, getByLabelText } = renderWithRouter(
      <PokemonDetails
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
        match={ { params: { id: '25' } } }
        onUpdateFavoritePokemons={ () => {} }
      />,
    );
    history.push('/pokemons/25');

    const favorite = queryByRole('checkbox');
    expect(favorite).toBeInTheDocument();
    fireEvent.click(favorite);

    const starIcon = queryAllByRole('img')
      .find((imgSrc) => imgSrc.src.endsWith('star-icon.svg'));
    expect(starIcon).toBeInTheDocument();
    fireEvent.click(favorite);
    expect(starIcon).not.toBe();

    const labelText = getByLabelText('Pokémon favoritado?');
    expect(labelText).toBeInTheDocument();
  });
});
