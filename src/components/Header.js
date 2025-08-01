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
import eastmlsStore from '@/store/eastmlsStore';
import { useRouter } from 'next/navigation';

function Header() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const isLoggedIn = eastmlsStore(state => state.isLoggedIn);
  const setIsLoggedIn = eastmlsStore(state => state.setIsLoggedIn);

  const router = useRouter();

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }
    setDrawerOpen(open);
  };


  const handleLogout = async() => {
    try {
      console.log("Logging out...");
      const res = await axios.get("/auth");
      console.log("Logout response:", res.data);
      if (res.data.status === "success") {
        router.push("/login");
        document.cookie = "EastMls=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        setIsLoggedIn(false);
      }
    } catch (error) {
      router.push("/login")
    }
  }

  const links = [
    {
      text: "Home",
      href: "/"
    },
    {
      text: "Buy Property",
      href: "/buy-property"
    },
    {
      text: "Property List",
      href: "/property"
    },
    {
      text: "Agents",
      href: "/agents"
    },
    {
      text: "My Inquiries",
      href: "/my-inquiries"
    }
  ]

  return (
    <AppBar position="static" sx={{ bgcolor: 'white', color: 'black', width: "100%" }}>
      <Container sx={{ width: "100%", height: "12vh", display: "flex", zIndex: "500", minHeight: "5rem" }}>
        <Toolbar disableGutters sx={{ justifyContent: 'space-between', width: "100%" }}>

          <Box sx={{ display: { xs: 'flex', lg: 'none' } }}>
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
              display: { xs: 'none', lg: 'flex' },
              justifyContent: 'space-between',
              maxWidth: "80%",
              alignItems: "center",
              justifySelf: "center"
            }}
          >

            <Stack direction={"row"} gap={5} >

              {
                links.map(link => (
                  <Link key={link.href} href={link.href} style={{ color: "#faa61f", textDecoration: "none" }}>{link.text}</Link>
                ))
              }

            </Stack>

            <Stack direction={"row"} alignItems={"center"}>

              <Button sx={{ bgcolor: "orange", color: "white", mr: "1rem" }} >Sell property</Button>
              {
                !isLoggedIn ? <Link href="/login" style={{ color: "#faa61f", textDecoration: "none" }}>Login</Link> : <Link href="/" onClick={handleLogout} style={{ color: "#faa61f", textDecoration: "none" }}>Logout</Link>
              }
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

                {
                  links.map(link => (
                    <ListItem button component={Link} href={link.href} sx={{ color: "#faa61f" }}>
                      <ListItemText  >{link.text}</ListItemText>
                    </ListItem>
                  ))
                }

                <Button fullWidth sx={{ bgcolor: "orange", color: "white" }}>Search property</Button>
              </List>
            </Box>
          </Drawer>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
