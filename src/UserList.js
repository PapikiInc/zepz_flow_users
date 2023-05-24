import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography } from '@material-ui/core';

const UserList = () => {
  const [users, setUsers] = useState([]); // State to hold the list of users
  const [error, setError] = useState(null); // State to track server error
  const [expandedUser, setExpandedUser] = useState(null); // State to track expanded user
  const [followedUsers, setFollowedUsers] = useState([]); // State to hold the list of followed users
  const [blockedUsers, setBlockedUsers] = useState([]); // State to hold the list of blocked users

  useEffect(() => {
    // Fetch the list of users from the server
    const fetchUsers = async () => {
      try {
        const response = await fetch('http://api.stackexchange.com/2.2/users?pagesize=20&order=desc&sort=reputation&site=stackoverflow');
        if (response.ok) {
          const data = await response.json();
          setUsers(data.items);
        } else {
          throw new Error('Failed to fetch users');
        }
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUsers();
  }, []);

  const handleExpandUser = (userId) => {
    setExpandedUser((prevUser) => (prevUser === userId ? null : userId));
  };

  const handleFollowUser = (userId) => {
    setFollowedUsers((prevFollowedUsers) => [...prevFollowedUsers, userId]);
  };

  const handleUnfollowUser = (userId) => {
    setFollowedUsers((prevFollowedUsers) => prevFollowedUsers.filter((id) => id !== userId));
  };

  const handleBlockUser = (userId) => {
    setBlockedUsers((prevBlockedUsers) => [...prevBlockedUsers, userId]);
  };

  const isUserFollowed = (userId) => followedUsers.includes(userId);
  const isUserBlocked = (userId) => blockedUsers.includes(userId);

  if (error) {
    return (
      <Typography variant="body1" color="error">
        Error: {error}
      </Typography>
    );
  }

  return (
    <List>
      {users.map((user) => (
        <ListItem
          key={user.user_id}
          button
          onClick={() => handleExpandUser(user.user_id)}
          disabled={isUserBlocked(user.user_id)}
          style={{ backgroundColor: isUserFollowed(user.user_id) ? '#f0f0f0' : 'inherit' }}
        >
          <ListItemAvatar>
            <Avatar src={user.profile_image} alt={user.display_name} />
          </ListItemAvatar>
          <ListItemText
            primary={user.display_name}
            secondary={`Reputation: ${user.reputation}`}
          />
          {isUserFollowed(user.user_id) && (
            <Typography variant="body2" color="textSecondary">
              Followed
            </Typography>
          )}
          {isUserFollowed(user.user_id) ? (
            <Typography
              variant="body2"
              color="primary"
              onClick={() => handleUnfollowUser(user.user_id)}
            >
              Unfollow
            </Typography>
          ) : (
            <div>
              <Typography
                variant="body2"
                color="primary"
                onClick={() => handleFollowUser(user.user_id)}
              >
                Follow
              </Typography>
              <Typography
                variant="body2"
                color="secondary"
                onClick={() => handleBlockUser(user.user_id)}
              >
                Block
              </Typography>
            </div>
          )}
        </ListItem>
      ))}
    </List>
  );
};

export default UserList;
