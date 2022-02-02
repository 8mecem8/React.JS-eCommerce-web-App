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
import ShoppingBasketOutlinedIcon from '@mui/icons-material/ShoppingBasketOutlined';
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';
import Drawer from '@mui/material/Drawer';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Badge from '@mui/material/Badge';




/* Custom Css */
import useStyles from './HeaderStyles'

import logo from '../../../logo.png';
import { height } from '@mui/system';
import Search from '../../../UtiComponents/search/SearchProducts';


const zurna = false






{/*------------------------ Burger Menu Style ------------------------*/}
/* const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem); */












function Header() {

  
  let {user,cart} = useSelector(state => ({...state}))
  

  const dispatch = useDispatch()
  const sty = useStyles()


    
  const [anchorEl, setAnchorEl] = useState(false);
  const [adminDashboardStatus, setAdminDashboardStatus] = useState(false);
  const [burgerMenu, setBurgerMEnu] = useState(false);
  
  


{/*------------------------Admin DashBoard ------------------------*/}



 const aDashboardClick = (event) => {
    setAdminDashboardStatus(event.currentTarget);
  };


 const aDashboardClose = () => {
    setAdminDashboardStatus(false);
  };





{/*------------------------ Account------------------------*/} 


  const handleClose = () => {
    setAnchorEl(false);
  };


  const handleMenu = () => {
    setAnchorEl(true);
  };

 

{/*------------------------ Burger Menu icon ------------------------*/}

 const burgerMenuHandleClick = (event) => {
    setBurgerMEnu(event.currentTarget);
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

<Link className="AppLogo" to="/"><img src={logo} style={{mixBlendMode: "screen",pointerEvents:"none",display:"flex",height: "40px",zIndex:1000}}   alt="logo" /></Link>
</Typography>


{/*------------------------ Burger Menu ------------------------*/}
<IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 0 }}
            onClick={burgerMenuHandleClick}
          >
            <MenuIcon />
</IconButton>


{/* <StyledMenu
        
      >
        <StyledMenuItem>
          <ListItemIcon>
            <SendIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Sent mail" />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
            <DraftsIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Drafts" />
        </StyledMenuItem>
        <StyledMenuItem>
          <ListItemIcon>
            <InboxIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Inbox" />
        </StyledMenuItem>
</StyledMenu> */}


{/* <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={burgerMenu}
        open={Boolean(burgerMenu)}
        onClose={burgerMenuHandleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
 */}



<Drawer  anchor={"left"} open={burgerMenu} onClose={() => {setBurgerMEnu(false)}} >


<Box >


      <List  >
        {['History', 'Password', 'Wishlist',].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>

            
            <Link to={`/user/${text.split(' ')[0]}`} className={sty.link_nav}><ListItemText primary={text} /></Link>
            
          </ListItem>
        ))}
      </List>


      <Divider />


      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>

            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>

            <Link to={`/user/${text.split(' ')[0]}`} className={sty.link_nav} underline="none"><ListItemText primary={text} /></Link>
          </ListItem>
        ))}
      </List>


</Box>




 </Drawer>








{/*------------------------Admin DashBoard ------------------------*/}
<Typography  component="div" sx={{ flexGrow: 1 }}>

{user?.role === "admin" ?<Button
        id="demo-positioned-button"
        aria-controls="demo-positioned-menu"
        aria-haspopup="true"
        
        onClick={aDashboardClick}
        sx={{color: 'common.white',fontWeight: 'bold',fontSize: 'subtitle1.fontSize' }}
        
      >
       <p className={sty.link}>Admin Dashboard</p>
  </Button> 
 :[]} 
  



<Drawer  anchor={"right"} open={adminDashboardStatus} onClose={aDashboardClose} >


<Box >


      <List  >
        {[['Admin Dashboard',"dashboard"],['Category & Subcategory',"category"],[' Create New Product',"product"],['All Products, edit&delete',"products"],['Coupons',"Coupons"]].map((text, index) =>
        {          
          
          return(
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>

            
             <Link to={`/admin/${text[1]}`} className={sty.link_nav}><ListItemText primary={text[0]} /></Link> 
            
          </ListItem>
        )})}
      </List>


      <Divider />


      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>

            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>

            <Link to={`/admin/${text.split(' ')[0]}`} className={sty.link_nav}><ListItemText primary={text} /></Link>
          </ListItem>
        ))}
      </List>


</Box>




 </Drawer>



{/*------------------------Browse Link to BrowseSearch ------------------------*/}
<Button variant="outlined" sx={{color:"white"}} startIcon={<ManageSearchIcon sx={{fontSize:"30px !important"}} />}><Link to="/search" style={{marginLeft:"-8px"}} className={sty.link}>Browse</Link></Button>

{/*------------------------Cart ------------------------*/}
<Link to="/cart" style={{marginLeft:"5px"}} className={sty.link}><Badge badgeContent={cart.length == 0 ? undefined : cart.length} anchorOrigin={{vertical: 'top', horizontal: 'left',}} color={cart.length == 0 ? undefined : "error"} ><LocalGroceryStoreOutlinedIcon sx={{fontSize:"30px !important"}} /></Badge>Cart</Link>



</Typography>


{/* Search Component */}
<Search />



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
                open={anchorEl}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={logOut}><ExitToAppIcon />Logout</MenuItem>
  </Menu>
              
</div> : null}

{/*------------------------ Login and register ------------------------*/}


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
