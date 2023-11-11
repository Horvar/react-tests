import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import DetailPage from '../pages/DetailPage';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useOutletContext: jest.fn(),
}));

const mockUseOutletContext = require('react-router-dom').useOutletContext;

describe('DetailPage Component', () => {
  const mockCloseDetails = jest.fn();
  const mockSelectedPerson = {
    name: 'Luke Skywalker',
    gender: 'male',
    height: '172',
    mass: '77',
    hair_color: 'blond',
    eye_color: 'blue',
    skin_color: 'fair',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('displays loading indicator while fetching data', () => {
    mockUseOutletContext.mockReturnValue({
      selectedPerson: null,
      closeDetails: mockCloseDetails,
    });
    render(<DetailPage />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('correctly displays detailed card data', () => {
    mockUseOutletContext.mockReturnValue({
      selectedPerson: mockSelectedPerson,
      closeDetails: mockCloseDetails,
    });
    render(<DetailPage />);
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('male')).toBeInTheDocument();
    expect(screen.getByText('172')).toBeInTheDocument();
    expect(screen.getByText('77')).toBeInTheDocument();
    expect(screen.getByText('blond')).toBeInTheDocument();
    expect(screen.getByText('blue')).toBeInTheDocument();
    expect(screen.getByText('fair')).toBeInTheDocument();
  });

  it('hides the component when close button is clicked', () => {
    mockUseOutletContext.mockReturnValue({
      selectedPerson: mockSelectedPerson,
      closeDetails: mockCloseDetails,
    });
    render(<DetailPage />);
    fireEvent.click(screen.getByText('Close'));
    expect(mockCloseDetails).toHaveBeenCalled();
  });
});
