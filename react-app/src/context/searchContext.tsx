import React, { createContext, useState, ReactNode } from 'react';
import { Person } from '../types';

interface SearchContextType {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  items: Person[];
  setItems: (items: Person[]) => void;
}

const defaultValue: SearchContextType = {
  searchTerm: '',
  setSearchTerm: () => {},
  items: [],
  setItems: () => {},
};

export const SearchContext = createContext<SearchContextType>(defaultValue);

interface SearchProviderProps {
  children: ReactNode;
}

export const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState<string>(defaultValue.searchTerm);
  const [items, setItems] = useState<Person[]>(defaultValue.items);

  return (
    <SearchContext.Provider
      value={{ searchTerm, setSearchTerm, items, setItems }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export default SearchProvider;
