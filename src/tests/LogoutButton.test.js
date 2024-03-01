import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Import MemoryRouter
import LogoutButton from '../components/LogoutButton';

// Mock useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(), // Mock the useNavigate hook
}));

describe('LogoutButton', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('calls useNavigate and localStorage.removeItem on button click', () => {
    const navigateMock = jest.fn();
    const removeItemMock = jest.spyOn(window.localStorage.__proto__, 'removeItem'); // Spy on removeItem method

    // Mock useNavigate to return the navigateMock function
    require('react-router-dom').useNavigate.mockReturnValue(navigateMock);

    // Render the component within MemoryRouter
    const { getByText } = render(
      <MemoryRouter>
        <LogoutButton />
      </MemoryRouter>
    );

    // Find the logout button and simulate a click event
    const logoutButton = getByText('Logout');
    fireEvent.click(logoutButton);

    // Expect the useNavigate function to have been called with "/"
    expect(navigateMock).toHaveBeenCalledWith("/");

    // Expect localStorage.removeItem to have been called with "userInfo"
    expect(removeItemMock).toHaveBeenCalledWith('userInfo');
  });
});
