import React from 'react';
import '@testing-library/jest-dom';
import { fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import { Pokedex } from '../components';
import { pokemons, isPokemonFavoriteById } from './pokeData';

describe('Testando o arquivo Pokedex.js', () => {
  it('exibe o próximo Pokémon da lista ao clicar o botão Próximo pokémon.', () => {
    const { getByRole, getByText } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    const messagePage = getByText(/Encountered pokémons/);
    expect(messagePage).toBeInTheDocument();
    const btnNext = getByRole('button', { name: 'Próximo pokémon' });
    expect(btnNext).toBeInTheDocument();

    const pokemonFirst = getByText(/Pikachu/);
    expect(pokemonFirst).toBeInTheDocument();

    fireEvent.click(btnNext);
    const pokemonLast = getByText(/Ekans/);
    expect(pokemonLast).toBeInTheDocument();

    fireEvent.click(btnNext);
    const pokemonReturn = getByText(/Pikachu/);
    expect(pokemonReturn).toBeInTheDocument();
  });

  it('Teste se é mostrado apenas um Pokémon por vez.', () => {
    const { getByText, queryByText } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    const pokemonFirst = getByText(/Pikachu/);
    expect(pokemonFirst).toBeInTheDocument();

    const pokemonLast = queryByText(/Ekans/);
    expect(pokemonLast).toBeNull();
  });

  it('Testa se a Pokédex tem os botões de filtro', () => {
    const { getByRole, getAllByTestId, getByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );

    const btn = getAllByTestId('pokemon-type-button');
    expect(btn.length.toString()).toBe('2');

    const types = ['Electric', 'Poison'];
    types.forEach((type) => {
      const btnType = getByRole('button', { name: type });
      expect(btnType).toBeDefined();
      fireEvent.click(btnType);
      const pokemon = getByTestId('pokemonType');
      expect(pokemon).toHaveTextContent(type);
    });
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const { getByRole, getByText } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    const btnAll = getByRole('button', { name: 'All' });
    expect(btnAll).toBeDefined();
    fireEvent.click(btnAll);

    const btnNext = getByRole('button', { name: 'Próximo pokémon' });
    expect(btnNext).toBeDefined();
    fireEvent.click(btnNext);
    const pokemonFirst = getByText(/Ekans/);
    expect(pokemonFirst).toBeInTheDocument();

    fireEvent.click(btnNext);
    const pokemonLast = getByText(/Pikachu/);
    expect(pokemonLast).toBeInTheDocument();
  });

  it('Se é criado dinamicamente, um botão de filtro para cada tipo de Pokémon.', () => {
    const { getByRole, getByTestId } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    const types = ['Electric', 'Poison'];
    types.forEach((type) => {
      const btnType = getByRole('button', { name: type });
      expect(btnType).toBeDefined();
      const btnAll = getByRole('button', { name: 'All' });
      expect(btnAll).toBeDefined();
      fireEvent.click(btnType);
      const pokemon = getByTestId('pokemonType');
      expect(pokemon).toHaveTextContent(type);
    });
  });

  it('Desabilitar botão quando a lista filtrada de Pokémons tiver um só pokémon', () => {
    const { getByRole } = renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ isPokemonFavoriteById }
      />,
    );
    const btn = getByRole('button', { name: 'Electric' });
    fireEvent.click(btn);

    const btnNext = getByRole('button', { name: 'Próximo pokémon' });
    expect(btnNext).toHaveAttribute('disabled');
  });
});
