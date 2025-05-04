// src/__tests__/Home.integration.test.jsx
import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Home from '../pages/Home';
import * as api from '../utils/api'; 
jest.mock('../utils/api');

const mockCountries = [
  {
    name: { common: 'France' },
    flags: { svg: 'https://flagcdn.com/fr.svg', png: 'https://flagcdn.com/fr.png' },
    region: 'Europe',
    capital: ['Paris'],
    population: 67000000,
    cca3: 'FRA',
    languages: { fra: 'French' }
  },
  {
    name: { common: 'Japan' },
    flags: { svg: 'https://flagcdn.com/jp.svg', png: 'https://flagcdn.com/jp.png' },
    region: 'Asia',
    capital: ['Tokyo'],
    population: 125800000,
    cca3: 'JPN',
    languages: { jpn: 'Japanese' }
  }
];

describe('Home Integration', () => {
  beforeEach(() => {
    api.getAllCountries.mockResolvedValue(mockCountries);
    api.getCountryByName.mockResolvedValue([mockCountries[0]]);
  });

  test('renders and filters countries by search', async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    // Wait for countries to load
    expect(await screen.findByText('France')).toBeInTheDocument();
    expect(screen.getByText('Japan')).toBeInTheDocument();

    // Simulate searching for "France"
    const searchInput = screen.getByPlaceholderText(/search countries/i);
    fireEvent.change(searchInput, { target: { value: 'France' } });

    // Wait for filtered results
    await waitFor(() => {
      expect(screen.getByText('France')).toBeInTheDocument();
      expect(screen.queryByText('Japan')).not.toBeInTheDocument();
    });
  });

  test('shows empty state when no results', async () => {
    api.getCountryByName.mockResolvedValue([]);
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    // Simulate searching for a non-existent country
    const searchInput = screen.getByPlaceholderText(/search countries/i);
    fireEvent.change(searchInput, { target: { value: 'Atlantis' } });

    // Wait for empty state
    await waitFor(() => {
      expect(screen.getByText(/no countries found/i)).toBeInTheDocument();
    });
  });
});
