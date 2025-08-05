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
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { api } from '@/utils/api';
import { eastMlsStore } from "../store/eastMlsStore.js"
import { InvalidTokenError, jwtDecode } from 'jwt-decode';
import { refreshAccessToken } from '@/utils/refreshAccessToken.js';
import { deleteCookie } from '@/utils/setCookie.js';


function Header() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const router = useRouter();
  const isLoggedIn = eastMlsStore(s => s.isLoggedIn);
  const setIsLoggedIn = eastMlsStore(s => s.setIsLoggedIn);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  const handleLogout = async () => {
    try {
      console.log("Logging out...");
      const res = await api.get("/auth");
      console.log("Logout response:", res.data);
      if (res.data.status === "success") {
        deleteCookie("EastMlsToken", "/");
        setIsLoggedIn(false);
        router.push("/login");
      }
    } catch (error) {
      console.error("Error logging out...", error);
    }
  };

  const links = [
    { text: "Home", href: "/" },
    { text: "Buy Property", href: "/buy-property" },
    { text: "Property List", href: "/property" },
    { text: "Agents", href: "/agents" },
    { text: "My Inquiries", href: "/my-inquiries" },
  ];

  return (
    <AppBar position="sticky" sx={{ bgcolor: 'white', color: 'black', width: "100%", position: "relative", boxShadow: "0px 0px 10px #dbdbdb !important" }}>
      <Container sx={{ width: "100%", height: "12vh", display: "flex", zIndex: "500", minHeight: "5rem", justifyContent: "space-between", alignItems: "center" }}>
        <Toolbar sx={{ justifyContent: 'space-between', width: "100%" }}>

          <Box sx={{ display: { xs: 'flex', lg: 'none' } }}>
            <IconButton onClick={toggleDrawer(true)} color="inherit">
              <MenuIcon />
            </IconButton>
          </Box>

          <Image src="/eastmls/logo.webp" alt="Logo" width={80} height={80} />

          <Box sx={{ flexGrow: 1, display: { xs: 'none', lg: 'flex' }, justifyContent: 'center', maxWidth: "80%", alignItems: "center", justifySelf: "center" }}>
            <Stack direction={"row"} justifyContent={'center'} display={'flex'}>
              {links.map(link => (
                <Link key={link.href} href={link.href} style={{ color: 'black', textDecoration: "none" }}>
                  <ListItem sx={{ color: 'black' }}>
                    <ListItemText>{link.text}</ListItemText>
                  </ListItem>
                </Link>
              ))}
            </Stack>
          </Box>

          <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
            <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
              <List>
                {links.map(link => (
                  <Link key={link.href} href={link.href}>
                    <ListItem button sx={{ color: "#faa61f" }}>
                      <ListItemText>{link.text}</ListItemText>
                    </ListItem>
                  </Link>
                ))}
                <Button fullWidth sx={{ bgcolor: "orange", color: "white" }}>Search property</Button>
              </List>
            </Box>
          </Drawer>
        </Toolbar>

        <Stack direction={"row"} alignItems={"center"} sx={{ position: "absolute", right: "20px", display: { xs: 'none', lg: 'flex' } }}>
          <Button sx={{ bgcolor: "orange", color: "white", mr: "1rem" }}>Sell property</Button>
          {isLoggedIn ? (
            <Link onClick={handleLogout} href="#" style={{ color: "#faa61f", textDecoration: "none" }}>Logout</Link>
          ) : (
            <Link href="/login" style={{ color: "#faa61f", textDecoration: "none" }}>Login</Link>
          )}
        </Stack>
      </Container>
    </AppBar>
  );
}

export default Header;
