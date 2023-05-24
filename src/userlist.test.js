import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UserList from './UserList';

describe('UserList component', () => {
  test('renders the user list and expands user options', () => {
    render(<UserList />);

    // Assert that the initial list of users is rendered
    const userListItems = screen.getByRole('listitem');
    expect(userListItems).toHaveLength(20);

    // Click on the "View Options" button for the first user
    const viewOptionsButton = screen.getByRole('button', { name: /View Options/i });
    fireEvent.click(viewOptionsButton);

    // Assert that the user options are displayed
    const followButton = screen.getByRole('button', { name: /Follow/i });
    const blockButton = screen.getByRole('button', { name: /Block/i });
    expect(followButton).toBeInTheDocument();
    expect(blockButton).toBeInTheDocument();
  });
});
