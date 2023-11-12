import { render, screen, fireEvent } from '@testing-library/react';
import NotFoundPage from '../pages/NotFoundPage';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('NotFoundPage Component', () => {
  it('displays the 404 page', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Return' })).toBeInTheDocument();
  });

  it('navigates to home page on return button click', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: 'Return' }));
    expect(mockNavigate).toHaveBeenCalledWith('/', {
      state: { fromNotFound: true },
    });
  });
});
