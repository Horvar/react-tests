import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SearchPage from '../pages/SearchPage';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

describe('SearchPage Component', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('fetches characters from API on search', async () => {
    const searchTerm = 'Luke Skywalker';
    const page = 1;
    const mockApiResponse = { results: [], count: 0 };
    fetchMock.mockResponseOnce(JSON.stringify(mockApiResponse));

    render(
      <MemoryRouter>
        <SearchPage />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: searchTerm },
    });
    fireEvent.click(screen.getByText('Search'));

    await waitFor(() =>
      expect(fetchMock).toHaveBeenCalledWith(
        `https://swapi.dev/api/people/?search=${searchTerm}&page=${page}`
      )
    );
  });
});
