import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import ShoppingCart from '@mui/icons-material/ShoppingCart'
import { useAuth } from '../context/Auth/AuthContext';
import { Badge, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Shop } from '@mui/icons-material';
import { useCart } from '../context/Cart/CartContext';


function Navbar() {

  const { username, isAuthenticated, logout } = useAuth();


  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const navigate = useNavigate();
  const { cartItems } = useCart();

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogin = () => {
    navigate('/login')
  }

  const handleLogout = () => {
    logout();
    navigate('/');
    handleCloseUserMenu();
  }

  const handleMyOrders = () => {
    navigate('/my-orders');
    handleCloseUserMenu();
  }

  const handleCart = () => {
    navigate('/cart');
  }

  const handleIcon = () => {
    navigate('/')
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>


          <Box sx={{ display: "flex", flexDirection: "row", justifyContent: "space-between", width: "100%", alignItems: "center" }}>
            <IconButton onClick={handleIcon}>
              <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>

                <AdbIcon sx={{ display: "flex", mr: 1, color: "white" }} />

                <Typography
                  variant="h6"
                  noWrap
                  component="a"
                  sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    fontFamily: 'monospace',
                    fontWeight: 700,
                    color: "white"
                  }}
                >
                  ElectoStore
                </Typography>
              </Box>
            </IconButton>
            <Box flexDirection="row" display="flex" gap={4} alignItems="center" justifyContent="center">
              <IconButton aria-label="cart" onClick={handleCart}>
                <Badge badgeContent={isAuthenticated ? cartItems.length : 0} color="secondary">
                  <ShoppingCart sx={{ color: "white" }} />
                </Badge>
              </IconButton>
              {isAuthenticated ? <>
                <Tooltip title="Open settings">
                  <Grid container alignItems="center" justifyContent="center" gap={2}>

                    <Grid>
                      <Typography>{username?.toString().toLowerCase()}</Typography>
                    </Grid>

                    <Grid>
                      <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                        <Avatar alt={username || ''} src="/static/images/avatar/2.jpg" />
                      </IconButton>
                    </Grid>

                  </Grid>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >

                  <MenuItem onClick={handleMyOrders}>
                    <Typography sx={{ textAlign: 'center' }}>Orders</Typography>
                  </MenuItem>

                  <MenuItem onClick={handleLogout}>
                    <Typography sx={{ textAlign: 'center' }}>Logout</Typography>
                  </MenuItem>
                </Menu>
              </> :
                <Button variant='contained' color="success" onClick={handleLogin}>Login</Button>}

            </Box>
          </Box>
        </Toolbar>
      </Container>
    </AppBar >
  );
}
export default Navbar;
