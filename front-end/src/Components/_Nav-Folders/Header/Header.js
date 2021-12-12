import React, {useState} from 'react';
import  {Link} from "react-router-dom";
import firebase from 'firebase/compat/app';
import { useSelector, useDispatch } from 'react-redux'

/* Material Uİ */
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddAltSharpIcon from '@mui/icons-material/PersonAddAltSharp';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

/* Custom Css */
import useStyles from './HeaderStyles'

import logo from '../../../logo.png';
import { height } from '@mui/system';





function Header() {

  const user = useSelector(state => state.user)

  

  const dispatch = useDispatch()
  const sty = useStyles()
    
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);
  
  const open = Boolean(anchorEl2);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

 const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };


  const logOut = () => {
      firebase.auth().signOut()
      dispatch({
          type:"LOGOUT",
          payload: null
      })
  }


  return (
<>
  
<Box sx={{ flexGrow: 1 }}>

  <AppBar position="static" sx={{ height: [80,54] }} >
    <Toolbar >



{/*------------------------ logo ------------------------*/}
<Typography
            
            noWrap
            component="div"
             sx={{ mr: 2,ml: 0 }} 
             underline="none"
          >
  {/* <Link  color="inherit" underline="none" sx={{ mr: 2,ml: 0, display: { xs: 'block', md: 'flex' } }}><img src={logo} className="App-logo" alt="logo" /></Link> */}

<Link className="AppLogo" to="/"><img src={logo} style={{mixBlendMode: "screen",pointerEvents:"none",display:"flex",height: "5vmin",zIndex:1000}}   alt="logo" /></Link>
</Typography>


{/*------------------------ Burger Menu icon ------------------------*/}
<IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 0 }}
          >
            <MenuIcon />
</IconButton>


{/*------------------------ DashBoard ------------------------*/}
<Typography  component="div" sx={{ flexGrow: 1 }}>


  <Button
        id="demo-positioned-button"
        aria-controls="demo-positioned-menu"
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick2}
        sx={{color: 'common.white',fontWeight: 'bold',fontSize: 'subtitle1.fontSize' }}
        
      >
       <p className={sty.link}> Dashboard </p>
  </Button> 


  <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl2}
        open={open}
        onClose={handleClose2}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        color="secondary"
        /* sx={{ flexGrow: 2 }} */
        
        
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
  </Menu>

</Typography>




      {/*------------------------ Account------------------------*/}    
{user ? <div>

  <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                sx={{color: 'common.white',fontWeight: 'bold',fontSize: 'h5.fontSize' }}
              >
                <AccountCircle sx={{fontSize: [80,40],m:"0",p:"0" }}/><p className={sty.proP}>{user.email.split('@')[0]}</p>
  </IconButton>


  <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={logOut}><ExitToAppIcon />Logout</MenuItem>
  </Menu>
              
</div> : null}

{/*------------------------ Loging and register ------------------------*/}


{!user && (<Stack spacing={2} direction="row" >
            
           
          <Button variant="text"  startIcon={<LoginIcon />} sx={{color: 'common.white',fontWeight: 'bold',fontSize: 'subtitle1.fontSize' }}><Link to="/login" className={sty.link}>Login</Link></Button>
          <Button variant="text"  startIcon={<PersonAddAltSharpIcon />} sx={{color: 'common.white',fontWeight: 'bold',fontSize: 'subtitle1.fontSize' }}><Link to="/register" className={sty.link}>Register</Link></Button>
  </Stack> )}
   


    </Toolbar>
  </AppBar>
</Box>
 </> 
  );
}

export default Header
