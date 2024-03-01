import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { MemoryRouter } from 'react-router-dom';
import Login from '../pages/Login';
import { loginMutation } from '../utils/Queries';

describe('Login Component', () => {
  const mocks = [
    {
      request: {
        query: loginMutation,
        variables: {
          email: 'test@example.com',
          password: 'password123',
        },
      },
      result: {
        data: {
          Auth: {
            loginJwt: {
              loginResult: {
                jwtTokens: {
                  accessToken: 'mockAccessToken',
                },
              },
            },
          },
        },
      },
    },
  ];

  it('renders the login form', () => {
    const { getByLabelText, getByText } = render(
      <MemoryRouter>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Login />
        </MockedProvider>
      </MemoryRouter>
    );

    expect(getByLabelText('Username:')).toBeInTheDocument();
    expect(getByLabelText('Password:')).toBeInTheDocument();
    expect(getByText('LOGIN')).toBeInTheDocument();
  });

  it('submits the form with correct credentials', async () => {
    const { getByLabelText, getByText } = render(
      <MemoryRouter>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Login />
        </MockedProvider>
      </MemoryRouter>
    );

    fireEvent.change(getByLabelText('Username:'), { target: { value: 'test@example.com' } });
    fireEvent.change(getByLabelText('Password:'), { target: { value: 'password123' } });

    fireEvent.click(getByText('LOGIN'));

    await waitFor(() => {
      expect(localStorage.getItem('userInfo')).toEqual(JSON.stringify({ username: 'test@example.com', token: 'mockAccessToken' }));
    });
  });

});
