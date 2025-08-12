'use client'
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
import { usePathname, useRouter } from 'next/navigation';
import { api } from '@/utils/api';
import toast from 'react-hot-toast';
import { verifyRole } from '@/utils/verifyRole';

function Header() {
  const router = useRouter();

  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [headerShowable, setHeaderShowable] = React.useState(true);
  const [loggedin, setloggedin] = React.useState(false);
  const pathname = usePathname();

  React.useEffect(() => {
    const fetchData = async () => {
      const verified = await verifyRole("user");

      if (verified === 'login required') {
        setHeaderShowable(true)
        setloggedin(false)
        router.push('/login')
        return
      }
      if (!verified) {
        setHeaderShowable(false)
      }
      setloggedin(true)
    };
    fetchData();

  }, [pathname]);

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return;
    setDrawerOpen(open);
  };

  async function handleLogout() {
    try {
      const res = await api.get("/auth", { withCredentials: true });
      if (res.data.status === "success") {
        toast.success(res.data.message);
        setloggedin(false)
        setHeaderShowable(true)
        router.push("/login");
      }
    } catch (error) {
      console.error("Error logging out...", error);
    }
  }

  const links = [
    { text: "Home", href: "/" },
    { text: "Buy Property", href: "/buy-property" },
    { text: "Property List", href: "/property" },
    { text: "Agents", href: "/agents" },
    { text: "My Inquiries", href: "/my-inquiries" },
  ];

  return (
    <>
      {headerShowable && (
        <AppBar position="sticky" sx={{ bgcolor: 'white', color: 'black', boxShadow: "0px 0px 10px #dbdbdb !important" }}>
          <Container sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Toolbar sx={{ justifyContent: 'space-between', width: "100%" }}>

              {/* Mobile menu icon */}
              <Box sx={{ display: { xs: 'flex', lg: 'none' } }}>
                <IconButton onClick={toggleDrawer(true)} color="inherit">
                  <MenuIcon />
                </IconButton>
              </Box>

              <Image src="/eastmls/logo.webp" alt="Logo" width={80} height={80} />

              <Box sx={{ flexGrow: 1, display: { xs: 'none', lg: 'flex' }, justifyContent: 'center' }}>
                <Stack direction="row">
                  {links.map(link => (
                    <Link key={link.href} href={link.href} style={{ textDecoration: "none", color: "black" }}>
                      <ListItem>
                        <ListItemText>{link.text}</ListItemText>
                      </ListItem>
                    </Link>
                  ))}
                </Stack>
              </Box>

              <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                <Box sx={{ width: 250 }} onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
                  <List>
                    {links.map(link => (
                      <Link key={link.href} href={link.href}  style={{color: "black", textDecoration: "none"}}>
                        <ListItem button>
                          <ListItemText>{link.text}</ListItemText>
                        </ListItem>
                      </Link>
                    ))}
                    <Button fullWidth sx={{ bgcolor: "orange", color: "white" }} onClick={() => router.push('/property')}>
                      Search property
                    </Button>
                  </List>
                </Box>
              </Drawer>
            </Toolbar>

            <Stack direction="row" alignItems="center" sx={{ position: "absolute", right: "20px", display: { xs: 'none', lg: 'flex' } }}>
              <Button sx={{ bgcolor: "orange", color: "white", mr: "1rem" }}>Sell property</Button>

              {loggedin ?
                <Button onClick={handleLogout} style={{ color: "#faa61f" }}>
                  Logout
                </Button>
                :
                <Button
                  onClick={() => {
                    router.push('/login');
                  }}
                  style={{ color: "#faa61f" }}
                >
                  Login
                </Button>
              }
            </Stack>
          </Container>
        </AppBar>
      )}
    </>
  );
}

export default Header;