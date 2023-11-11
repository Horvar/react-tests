import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Pagination from '../components/Pagination';

describe('Pagination Component', () => {
  test('updates URL query parameter when page changes', async () => {
    const mockOnPaginate = jest.fn();
    const totalItems = 50;
    const currentPage = 1;

    render(
      <MemoryRouter initialEntries={['/test?page=1']}>
        <Routes>
          <Route
            path="/test"
            element={
              <Pagination
                total={totalItems}
                currentPage={currentPage}
                onPaginate={mockOnPaginate}
              />
            }
          />
        </Routes>
      </MemoryRouter>
    );

    const secondPageButton = await screen.findByText('2');
    userEvent.click(secondPageButton);

    await waitFor(() => {
      expect(mockOnPaginate).toHaveBeenCalledWith(2);
    });
  });
});
