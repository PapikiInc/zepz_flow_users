import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UserList from './UserList';

describe('UserList Component', () => {
  // Mocked user data for testing
  const users = [
    { user_id: 1, display_name: 'John Doe', reputation: 1000 },
    { user_id: 2, display_name: 'Jane Smith', reputation: 2000 },
  ];

  test('renders user list correctly', () => {
    render(<UserList />);

    // Assert that the user list is initially empty
    const userList = screen.getByRole('list');
    expect(userList.children.length).toBe(0);

    // Update the component with mocked user data
    render(<UserList users={users} />);

    // Assert that the user list is populated with the correct number of users
    const userItems = screen.getAllByRole('listitem');
    expect(userItems.length).toBe(users.length);

    // Assert that the user details are displayed correctly
    const firstUser = screen.getByText('John Doe');
    const secondUser = screen.getByText('Jane Smith');
    expect(firstUser).toBeInTheDocument();
    expect(secondUser).toBeInTheDocument();
  });

  test('displays user options when "View Options" button is clicked', () => {
    render(<UserList />);
  
    const viewOptionsButton = screen.getByRole('button', { name: 'View Options' });
    fireEvent.click(viewOptionsButton);
  
    // Assert that the user options are displayed
    const followButton = screen.getByRole('button', { name: 'Follow' });
    const blockButton = screen.getByRole('button', { name: 'Block' });
    expect(followButton).toBeInTheDocument();
    expect(blockButton).toBeInTheDocument();
  });
  
  test('follows a user when "Follow" button is clicked', () => {
    render(<UserList users={users} />);
  
    const followButton = screen.getByRole('button', { name: 'Follow' });
    fireEvent.click(followButton);
  
    // Assert that the user is followed
    const followedUser = screen.getByRole('button', { name: 'Unfollow' });
    expect(followedUser).toBeInTheDocument();
  });
  
  test('unfollows a user when "Unfollow" button is clicked', () => {
    render(<UserList users={users} />);
  
    const followButton = screen.getByRole('button', { name: 'Follow' });
    fireEvent.click(followButton);
  
    // Assert that the user is followed
    const followedUser = screen.getByRole('button', { name: 'Unfollow' });
    expect(followedUser).toBeInTheDocument();
  
    // Click the "Unfollow" button
    fireEvent.click(followedUser);
  
    // Assert that the user is unfollowed
    const unfollowedUser = screen.getByRole('button', { name: 'Follow' });
    expect(unfollowedUser).toBeInTheDocument();
  });
  
  test('blocks a user when "Block" button is clicked', () => {
    render(<UserList users={users} />);
  
    const blockButton = screen.getByRole('button', { name: 'Block' });
    fireEvent.click(blockButton);
  
    // Assert that the user is blocked
    const blockedUser = screen.getByRole('button', { name: 'Unblock' });
    expect(blockedUser).toBeInTheDocument();
  });
  
  test('unblocks a user when "Unblock" button is clicked', () => {
    render(<UserList users={users} />);
  
    const blockButton = screen.getByRole('button', { name: 'Block' });
    fireEvent.click(blockButton);
  
    // Assert that the user is blocked
    const blockedUser = screen.getByRole('button', { name: 'Unblock' });
    expect(blockedUser).toBeInTheDocument();
  
    // Click the "Unblock" button
    fireEvent.click(blockedUser);
  
    // Assert that the user is unblocked
    const unblockedUser = screen.getByRole('button', { name: 'Block' });
    expect(unblockedUser).toBeInTheDocument();
  });
  
  

});
