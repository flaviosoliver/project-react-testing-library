import React from 'react';
import { render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Testando o arquivo NotFound.js', () => {
  it('Teste se página contém um h2 com o texto Page requested not found 😭"', () => {
    const { getByRole } = render(<NotFound />);

    const heading = getByRole('heading', { name: /Page requested not found/ });
    expect(heading).toBeInTheDocument();
  });

  it('Teste se página mostra uma imagem definida', () => {
    const { getAllByRole } = render(<NotFound />);

    const image = getAllByRole('img')[1];
    expect(image).toHaveAttribute(
      'src',
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
    );
  });
});
