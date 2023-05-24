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
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [expandedUser, setExpandedUser] = useState(null);
  const [followedUsers, setFollowedUsers] = useState([]);
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

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

  const handleExpandUser = (userId) => {
    setExpandedUser((prevUser) => (prevUser === userId ? null : userId));
  };

  const handleFollowUser = (userId) => {
    if (!isUserBlocked(userId)) {
      setFollowedUsers((prevFollowedUsers) => [...prevFollowedUsers, userId]);
    }
  };

  const handleUnfollowUser = (userId) => {
    setFollowedUsers((prevFollowedUsers) => prevFollowedUsers.filter((id) => id !== userId));
  };

  const handleBlockUser = (userId) => {
    if (isUserFollowed(userId)) {
      setFollowedUsers((prevFollowedUsers) => prevFollowedUsers.filter((id) => id !== userId));
    }
    setBlockedUsers((prevBlockedUsers) => [...prevBlockedUsers, userId]);
  };

  const isUserFollowed = (userId) => followedUsers.includes(userId);
  const isUserBlocked = (userId) => blockedUsers.includes(userId);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.display_name.toLowerCase().includes(searchQuery.toLowerCase())
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
            User List
          </Typography>
          <TextField
            label="Search"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={handleSearchChange}
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
                  className={`user-card ${isUserBlocked(user.user_id) ? 'blocked' : ''}`}
                >
                  <ListItemAvatar>
                    <Avatar src={user.profile_image} alt={user.display_name} className="user-avatar" />
                  </ListItemAvatar>
                  <CardContent>
                    <ListItemText
                      primary={user.display_name}
                      secondary={`Reputation: ${user.reputation}`}
                    />
                  </CardContent>
                  <CardActions className="actions">
                    {!isUserBlocked(user.user_id) && (
                      <Button
                        size="small"
                        color="primary"
                        onClick={() => handleExpandUser(user.user_id)}
                        disabled={expandedUser === user.user_id}
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
                            disabled={isUserBlocked(user.user_id)}
                          >
                            Unfollow
                          </Button>
                        ) : (
                          <Button
                            size="small"
                            color="primary"
                            onClick={() => handleFollowUser(user.user_id)}
                            disabled={isUserBlocked(user.user_id)}
                          >
                            Follow
                          </Button>
                        )}
                        <Button
                          size="small"
                          color="secondary"
                          onClick={() => handleBlockUser(user.user_id)}
                        >
                          Block
                        </Button>
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
