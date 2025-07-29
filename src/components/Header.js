'use client';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Drawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import Link from 'next/link';
import Image from 'next/image';
import { Button, List, ListItem, ListItemText } from '@mui/material';

function Header() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };


  return (
    <AppBar position="static" sx={{ bgcolor: 'white', color: 'black' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>

          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton onClick={toggleDrawer(true)} color="inherit">
              <MenuIcon />
            </IconButton>
          </Box>

          <Image
            src="/eastmls/logo.webp"
            alt="Logo"
            width={80}
            height={80}
          />

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'center',
            }}
          >
            <Stack direction="row" gap={4} fontWeight="semibold" fontSize="1rem">
              <Link href="/">Home</Link>
              <Link href="/buy-property">Buy Property</Link>
              <Link href="/property">Property List</Link>
              <Link href="/agents">Agents</Link>
              <Link href="/my-inquries">My Inquiries</Link>
            </Stack>
          </Box>

          <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
            <Box
              sx={{ width: 250 }}
              role="presentation"
              onClick={toggleDrawer(false)}
              onKeyDown={toggleDrawer(false)}
            >
              <List>

                <ListItem button component={Link} href={"/"}>
                  <ListItemText  >home</ListItemText>
                </ListItem>
                <ListItem button component={Link} href={"/buy-property"}>
                  <ListItemText  >Buy property</ListItemText>
                </ListItem>
                <ListItem button component={Link} href={"/property"}>
                  <ListItemText  >Property list</ListItemText>
                </ListItem>
                <ListItem button component={Link} href={"/agents"}>
                  <ListItemText  >Agents</ListItemText>
                </ListItem>
                <ListItem button component={Link} href={"/my-inquries"}>
                  <ListItemText  >My enquries</ListItemText>
                </ListItem>
                <ListItem button component={Link} href={"/"}>
                  <ListItemText  >Logout</ListItemText>
                </ListItem>
                <Button fullWidth sx={{bgcolor:"orange", color:"white"}}>Search property</Button>
              </List>
            </Box>
          </Drawer>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
