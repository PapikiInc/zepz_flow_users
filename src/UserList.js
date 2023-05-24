import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography } from '@material-ui/core';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
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

  if (error) {
    return (
      <Typography variant="body1" color="error">
        Error: {error}
      </Typography>
    );
  }

  return (
    <List>
      {users.map(user => (
        <ListItem key={user.user_id}>
          <ListItemAvatar>
            <Avatar src={user.profile_image} alt={user.display_name} />
          </ListItemAvatar>
          <ListItemText
            primary={user.display_name}
            secondary={`Reputation: ${user.reputation}`}
          />
        </ListItem>
      ))}
    </List>
  );
};

export default UserList;
