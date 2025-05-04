import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from '../components/SearchBar';

test('calls onSearch when input changes', () => {
  const mockSearch = jest.fn();
  render(<SearchBar onSearch={mockSearch} value="" />);
  
  fireEvent.change(screen.getByPlaceholderText(/search countries/i), {
    target: { value: 'Canada' }
  });
  
  expect(mockSearch).toHaveBeenCalledWith('Canada');
});

test('clears search field when clear button is clicked', () => {
  const mockSearch = jest.fn();
  render(<SearchBar onSearch={mockSearch} value="Canada" />);
  
  fireEvent.click(screen.getByRole('button'));
  
  expect(mockSearch).toHaveBeenCalledWith('');
});
