import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Results from '../components/Results';
import '@testing-library/jest-dom';

describe('Results Component', () => {
  const mockData = [
    {
      name: 'Luke Skywalker',
      gender: 'male',
      height: '172',
      mass: '77',
      url: '1',
      skin_color: 'fair',
      eye_color: 'blue',
      hair_color: 'blond',
    },
  ];

  const mockOnItemSelected = jest.fn();

  it('renders the specified number of items', () => {
    render(
      <MemoryRouter>
        <Results data={mockData} onItemSelected={mockOnItemSelected} />
      </MemoryRouter>
    );
    const items = screen.getAllByTestId('result-item');
    expect(items.length).toBe(mockData.length);
  });

  it('displays a message if no cards are present', () => {
    render(
      <MemoryRouter>
        <Results data={[]} onItemSelected={mockOnItemSelected} />
      </MemoryRouter>
    );
    expect(screen.getByText('No cards available')).toBeInTheDocument();
  });

  it('renders card data correctly', () => {
    render(
      <MemoryRouter>
        <Results data={mockData} onItemSelected={mockOnItemSelected} />
      </MemoryRouter>
    );

    expect(screen.getByText(mockData[0].name)).toBeInTheDocument();
    expect(screen.getByText(mockData[0].gender)).toBeInTheDocument();
    expect(screen.getByText(mockData[0].height)).toBeInTheDocument();
    expect(screen.getByText(mockData[0].mass)).toBeInTheDocument();
  });

  it('opens details page on card click', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Results data={mockData} onItemSelected={mockOnItemSelected} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getAllByTestId('result-item')[0]);
  });
});
