import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { fireEvent, render } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Requisito 01', () => {
  it('renders a reading with the text `Pokédex`', () => {
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const heading = getByText(/Pokédex/i);
    expect(heading).toBeInTheDocument();
  });

  it('shows the Pokédex when the route is `/`', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );

    expect(getByText('Encountered pokémons')).toBeInTheDocument();
  });
});

describe('teste de renderização de links no topo da aplicação', () => {
  it('renderizar links - home', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );

    const home = getByText(/Home/i);
    expect(home).toBeInTheDocument();
    expect(home).toHaveAttribute('href', '/');
  });

  it('renderizar links - about', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );

    const about = getByText(/about/i);
    expect(about).toBeInTheDocument();
    expect(about).toHaveAttribute('href', '/about');
  });

  it('renderizar links - favorites', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );

    const favorites = getByText(/Favorite Pokémons/i);
    expect(favorites).toBeInTheDocument();
    expect(favorites).toHaveAttribute('href', '/favorites');
  });

  it('redireciona para página correta ao clicar no botão - home', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );

    const home = getByText(/Home/i);
    fireEvent.click(home);
    expect(getByText(/Encountered pokémons/i)).toBeInTheDocument();
  });

  it('redireciona para página correta ao clicar no botão - about', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );

    const about = getByText(/about/i);
    fireEvent.click(about);
    expect(getByText(/About Pokédex/i)).toBeInTheDocument();
  });

  it('redireciona para página correta ao clicar no botão - favorites', () => {
    const { getByText, getAllByText } = render(
      <MemoryRouter initialEntries={ ['/'] }>
        <App />
      </MemoryRouter>,
    );

    const favorites = getByText(/Favorite Pokémons/i);
    fireEvent.click(favorites);
    const messageFavorite = getAllByText(/Favorite pokémons/i);
    expect(messageFavorite[1]).toBeInTheDocument();
  });

  it('redireciona para página Not Found em URL desconhecida', () => {
    const { getByText, history } = renderWithRouter(<App />);

    history.push('/pagenotfound');
    expect(getByText(/Page requested not found/i)).toBeInTheDocument();
  });
});
