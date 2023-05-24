import React, { useState, useEffect } from 'react';
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  TextField,
  AppBar,
  Toolbar,
  Grid,
} from '@material-ui/core';
import './UserList.css'; // Import the CSS file

const UserList = () => {
  const [users, setUsers] = useState([]); // State for storing the list of users
  const [error, setError] = useState(null); // State for storing error message
  const [expandedUser, setExpandedUser] = useState(null); // State for tracking expanded user
  const [followedUsers, setFollowedUsers] = useState([]); // State for tracking followed users
  const [blockedUsers, setBlockedUsers] = useState([]); // State for tracking blocked users
  const [searchQuery, setSearchQuery] = useState(''); // State for storing search query

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

    fetchUsers(); // Fetch users data when the component mounts
  }, []);

  const handleExpandUser = (userId) => {
    setExpandedUser((prevUser) => (prevUser === userId ? null : userId)); // Expand/collapse user card
  };

  const handleFollowUser = (userId) => {
    if (!isUserBlocked(userId)) {
      setFollowedUsers((prevFollowedUsers) => [...prevFollowedUsers, userId]); // Follow a user if not blocked
    }
  };

  const handleUnfollowUser = (userId) => {
    setFollowedUsers((prevFollowedUsers) => prevFollowedUsers.filter((id) => id !== userId)); // Unfollow a user
  };

  const handleBlockUser = (userId) => {
    if (isUserFollowed(userId)) {
      setFollowedUsers((prevFollowedUsers) => prevFollowedUsers.filter((id) => id !== userId)); // Unfollow a user if already followed
    }
    setBlockedUsers((prevBlockedUsers) => [...prevBlockedUsers, userId]); // Block a user
  };

  const handleUnblockUser = (userId) => {
    setBlockedUsers((prevBlockedUsers) => prevBlockedUsers.filter((id) => id !== userId)); // Unblock a user
  };

  const isUserFollowed = (userId) => followedUsers.includes(userId); // Check if a user is followed
  const isUserBlocked = (userId) => blockedUsers.includes(userId); // Check if a user is blocked

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value); // Update search query
  };

  const filteredUsers = users.filter((user) =>
    user.display_name.toLowerCase().includes(searchQuery.toLowerCase()) // Filter users based on search query
  );

  if (error) {
    return (
      <Typography variant="body1" color="error">
        Error: {error}
      </Typography>
    );
  }

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Top 20 StackOverflow users
          </Typography>
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={handleSearchChange} // Search input field
          />
        </Toolbar>
      </AppBar>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <List>
            {filteredUsers.map((user) => (
              <ListItem key={user.user_id} disableGutters className="user-list-item">
                <Card
                  variant="outlined"
                  className={`user-card ${isUserBlocked(user.user_id) ? 'blocked' : ''}`} // Apply "blocked" class to blocked users
                >
                  <ListItemAvatar>
                    <Avatar src={user.profile_image} alt={user.display_name} className="user-avatar" />
                  </ListItemAvatar>
                  <CardContent>
                    <ListItemText
                      primary={user.display_name} // User display name
                      secondary={`Reputation: ${user.reputation}`} // User reputation
                    />
                  </CardContent>
                  <CardActions className="actions">
                    {!isUserBlocked(user.user_id) && (
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => handleExpandUser(user.user_id)}
                        disabled={expandedUser === user.user_id} // Disable button if user card is expanded
                      >
                        {expandedUser === user.user_id ? 'Viewing' : 'View Options'}
                      </Button>
                    )}
                    {expandedUser === user.user_id && (
                      <div>
                        {isUserFollowed(user.user_id) ? (
                          <Button
                            size="small"
                            color="primary"
                            onClick={() => handleUnfollowUser(user.user_id)}
                            disabled={isUserBlocked(user.user_id)} // Disable button if user is blocked
                          >
                            Unfollow
                          </Button>
                        ) : (
                          <Button
                            size="small"
                            color="primary"
                            onClick={() => handleFollowUser(user.user_id)}
                            disabled={isUserBlocked(user.user_id)} // Disable button if user is blocked
                          >
                            Follow
                          </Button>
                        )}
                        {isUserBlocked(user.user_id) && (
                          <Button
                            size="small"
                            color="primary"
                            onClick={() => handleUnblockUser(user.user_id)}
                          >
                            Unblock
                          </Button>
                        )}
                        {!isUserBlocked(user.user_id) && (
                          <Button
                            size="small"
                            color="secondary"
                            onClick={() => handleBlockUser(user.user_id)}
                          >
                            Block
                          </Button>
                        )}
                      </div>
                    )}
                  </CardActions>
                </Card>
              </ListItem>
            ))}
          </List>
        </Grid>
        <Grid item xs={12} md={4}>
          <div>
            {blockedUsers.length > 0 && (
              <div>
                <Typography variant="h6">Blocked Users:</Typography>
                <List>
                  {users
                    .filter((user) => blockedUsers.includes(user.user_id))
                    .map((blockedUser) => (
                      <ListItem key={blockedUser.user_id}>
                        <ListItemText primary={blockedUser.display_name} />
                      </ListItem>
                    ))}
                </List>
              </div>
            )}
            {followedUsers.length > 0 && (
              <div>
                <Typography variant="h6">Followed Users:</Typography>
                <List>
                  {users
                    .filter((user) => followedUsers.includes(user.user_id))
                    .map((followedUser) => (
                      <ListItem key={followedUser.user_id}>
                        <ListItemText primary={followedUser.display_name} />
                      </ListItem>
                    ))}
                </List>
              </div>
            )}
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default UserList;
