import React from 'react';
import { About } from '../components';
import renderWithRouter from './renderWithRouter';

describe('Testando o arquivo About.js', () => {
  it('teste se renderiza a página About', () => {
    const { getByText } = renderWithRouter(
      <About />,
    );

    expect(getByText(/About Pokédex/i)).toBeInTheDocument();
  });

  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const { getByRole } = renderWithRouter(
      <About />,
    );

    const tagType = getByRole('heading', { name: 'About Pokédex' });
    expect(tagType).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos', () => {
    const { container } = renderWithRouter(
      <About />,
    );

    const paragraph = container.querySelectorAll('p');
    const paragraphNumber = 2;
    expect(paragraph.length).toBe(paragraphNumber);
  });

  it('Teste se a página contém a imagem de uma Pokédex', () => {
    const { container } = renderWithRouter(
      <About />,
    );

    const imagePokedex = container.querySelector('img');
    expect(imagePokedex.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
