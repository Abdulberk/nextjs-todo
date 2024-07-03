'use client';
import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, CircularProgress } from '@mui/material';
import { useLogout } from '@/app/(routes)/(auth)/login/api/useLogin';
import cookie from 'js-cookie';
import { UserProfile } from '@/app/_interfaces/user-profile.interface';

const Navbar: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const userData = cookie.get('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const { signOutMutation } = useLogout();

  const handleLogout = () => {
    signOutMutation.mutate();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Todo App
        </Typography>
        {user ? (
          <Typography variant="body1">
            {user.email}
          </Typography>
        ) : (
          <CircularProgress color="inherit" />
        )}
        <Button color="inherit" onClick={handleLogout}>Logout</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
