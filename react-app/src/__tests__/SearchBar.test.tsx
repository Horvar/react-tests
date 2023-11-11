import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchBar from '../components/SearchBar';

beforeAll(() => {
  Object.defineProperty(window, 'localStorage', {
    value: mockLocalStorage,
    writable: true,
  });
});

const mockLocalStorage = (() => {
  let store: Record<string, string> = {};

  return {
    getItem(key: string) {
      return store[key] || null;
    },
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value.toString();
    }),
    clear() {
      store = {};
    },
    removeItem(key: string) {
      delete store[key];
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

describe('SearchBar Component', () => {
  beforeEach(() => {
    // Очистить все моки перед каждым тестом
    jest.clearAllMocks();
  });

  it('saves entered value to local storage on search', () => {
    const searchTerm = 'star wars';
    const mockOnSearch = jest.fn();

    render(<SearchBar onSearch={mockOnSearch} />);

    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: searchTerm },
    });
    fireEvent.click(screen.getByText('Search'));

    expect(mockLocalStorage.setItem).toHaveBeenCalledWith(
      'searchTerm',
      searchTerm
    );
    expect(mockOnSearch).toHaveBeenCalledWith(searchTerm, 1);
  });

  test('retrieves the value from local storage upon mounting', () => {
    const searchTerm = 'Star Wars';
    localStorage.setItem('searchTerm', searchTerm);
    const mockOnSearch = jest.fn();

    render(<SearchBar onSearch={mockOnSearch} />);

    expect(screen.getByRole('textbox')).toHaveValue(searchTerm);
  });
});
