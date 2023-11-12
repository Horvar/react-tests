import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import DetailPage from '../pages/DetailPage';
import '@testing-library/jest-dom';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

const mockCloseDetails = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useOutletContext: () => ({ closeDetails: mockCloseDetails }),
}));

describe('DetailPage Component', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
    mockCloseDetails.mockClear();
  });

  const mockPerson = {
    name: 'Luke Skywalker',
    gender: 'male',
    height: '172',
    mass: '77',
    hair_color: 'blond',
    eye_color: 'blue',
    skin_color: 'fair',
  };

  it('displays loading indicator while fetching data', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockPerson));

    render(<DetailPage />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();

    await waitFor(() => screen.getByText('Luke Skywalker'));
  });

  it('correctly displays detailed card data', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockPerson));

    render(<DetailPage />);

    await waitFor(() => screen.getByText('Luke Skywalker'));

    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('male')).toBeInTheDocument();
    expect(screen.getByText('172')).toBeInTheDocument();
    expect(screen.getByText('77')).toBeInTheDocument();
    expect(screen.getByText('blond')).toBeInTheDocument();
    expect(screen.getByText('blue')).toBeInTheDocument();
    expect(screen.getByText('fair')).toBeInTheDocument();
  });

  it('hides the component when close button is clicked', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(mockPerson));

    render(<DetailPage />);

    await waitFor(() => screen.getByText('Luke Skywalker'));

    fireEvent.click(screen.getByText('Close'));
    expect(mockCloseDetails).toHaveBeenCalled();
  });
});
