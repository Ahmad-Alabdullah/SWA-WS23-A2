'use client';

import { useTheme } from '@mui/material/styles';
import { useContext, useState } from 'react';

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Box from '@mui/material/Box';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import CssBaseline from '@mui/material/CssBaseline';
import HomeIcon from '@mui/icons-material/Home';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LoginContext from '../context/LoginProvider';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import PeopleIcon from '@mui/icons-material/People';
import SearchIcon from '@mui/icons-material/Search';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import Toolbar from '@mui/material/Toolbar';
import Link from 'next/link';
import { AppBar, Drawer, Header } from './Nav_Styles';
import { Button, Paper, Typography, styled } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { Righteous } from 'next/font/google';

export default function Nav() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);

  const { isLoggedIn, username } = useContext(LoginContext);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const menuItems = [
    { key: 'Home', icon: <HomeIcon />, href: '/' },
    ...(isLoggedIn
      ? [
          {
            key: 'Hinzufügen',
            icon: <AddCircleOutlineIcon />,
            href: '/create',
          },
        ]
      : []),
    { key: 'Suche', icon: <SearchIcon />, href: '/search' },
    { key: 'Diagramme', icon: <StackedLineChartIcon />, href: '/charts' },
    { key: 'Über uns', icon: <PeopleIcon />, href: '/about' },
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Drawer variant="permanent" open={open} sx={{zIndex: theme.zIndex.drawer + 2}}>
        <Header>
        <IconButton 
            color="inherit"
            aria-label="toggle drawer"
            onClick={open ? handleDrawerClose : handleDrawerOpen}
            edge="start"
            sx={{ 
              color: '#FFFFFF', 
              position: 'relative', 
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              }}
          >
            {open ? <ChevronLeftIcon /> : <MenuIcon />}
          </IconButton>
        </Header>
        <List>
          {menuItems.map(({ key, icon, href }) => (
            <ListItem key={key} disablePadding sx={{ display: 'block' }}>
              <Link href={href} style={{ textDecoration: 'none' }}>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                      color: '#FFFFFF',
                    }}
                  >
                    {icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={key}
                    sx={{
                      opacity: open ? 1 : 0,
                      color: '#FFFFFF',
                    }}
                  />
                </ListItemButton>
              </Link>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <AppBar position="fixed">
        <Toolbar
          sx={{
            backgroundColor: '#FFFFFF',
            display: 'block',
            position: 'fixed',
            paddingLeft: '0',
            zIndex: theme.zIndex.drawer + 1,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ marginRight: 1 }}>
              {isLoggedIn && `Hello, ${username}!`}
            </Typography>
            {isLoggedIn && (
              <PersonIcon
                sx={{
                  marginRight: 1,
                  color: '#585555',
                }}
              />
            )}
            <Link href="/login" style={{ textDecoration: 'none', alignContent: 'right' }}>
              <Button
                sx={{
                  minHeight: 48,
                  justifyContent: 'center',
                  marginLeft: '1350px',
                  px: 2.5,
                }}
              >
                <IconButton
                  sx={{
                    minWidth: 0,
                    justifyContent: 'center',
                  }}
                >
                  {isLoggedIn ? <LogoutIcon /> : <LoginIcon />}
                </IconButton>
                <Typography
                  color="#585555"
                  sx={{
                    opacity: 1,
                    textTransform: 'none',
                  }}
                >
                  {isLoggedIn ? 'Logout' : 'Login'}
                </Typography>
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
