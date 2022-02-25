import React, {useState,useLayoutEffect} from 'react';
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
import LoginIcon from '@mui/icons-material/Login';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import EmailIcon from '@mui/icons-material/Email';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import Grid from '@mui/material/Grid';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Badge from '@mui/material/Badge';
import LocalGroceryStoreOutlinedIcon from '@mui/icons-material/LocalGroceryStoreOutlined';



/* Custom Css */
import useStyles from './HeaderStyles'
import './Header.css'

import logo from '../../../logo.png';
import { height } from '@mui/system';
import Search from '../../../UtiComponents/search/SearchProducts';





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












function Header(props) {

  
  let {user,cart} = useSelector((state) => ({...state}))
  

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







  function HideOnScroll(props) {
  const { children, window } = props;
  
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });



  

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}



function ElevationScroll(props) {
  const { children, window } = props;
 
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
    mt:trigger ? 0 : 5,
  });
}









 window.addEventListener('scroll',()=>
 {
    const el = document.getElementById("secondappbar")

    

    if(window.scrollY > 3){el.style.marginTop = "0px"}

    if(window.scrollY <= 1){el.style.marginTop = "40px"}
 })






  return (
<>
  
<Box sx={{ display:"flex",flexDirection:"column", flexGrow: 1 }}>

     
              
          <HideOnScroll {...props}>
                  <AppBar   sx={{position:"inherit",height:35,boxShadow:"none !important"}}>
                    
                      
                        <Grid container direction="row" sx={{height:"100% !important"}}>

                              <Grid container direction="row" sx={{height:"100% !important",justifyContent:"center"}} item xs={6}>

                                  <Grid item xs={3} sx={{display:"flex",alignItems:"center",justifyContent:"center"}}>
                                
                                    <LocalPhoneIcon sx={{fontFamily:"inherit",fontSize:"25px !important"}} />
                                    <Typography sx={{fontFamily:"inherit",fontSize:"15px !important"}}>+1 646 334 67 33</Typography>

                                  </Grid>

                                  <Grid item xs={2} sx={{display:"flex",alignItems:"center"}}>
                                
                                    <EmailIcon sx={{fontFamily:"inherit",fontSize:"25px !important"}} />
                                    <Typography sx={{fontFamily:"inherit",fontSize:"15px !important"}}>&nbsp;info@pazaar.com</Typography>
                                
                                  </Grid>
                                
                              </Grid>

                              <Grid container direction="row" sx={{height:"100% !important",justifyContent:"center"}} item xs={6}>
                                
                                  <Grid item xs={2} sx={{display:"flex",alignItems:"center"}}>

                                    <ContactSupportIcon sx={{fontFamily:"inherit",fontSize:"25px !important"}} />
                                    <Typography sx={{fontFamily:"inherit",fontSize:"15px !important"}}>Help Page</Typography>

                                  </Grid>
                                  

                                  <Grid item xs={4} sx={{display:"flex",alignItems:"center"}}>

                                    <CurrencyExchangeIcon sx={{fontFamily:"inherit",fontSize:"22px !important"}} />
                                    {/* <Typography>Choose Currency</Typography> */}
                                    <Select
                                        variant="standard"
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        defaultValue="USD"
                                        label="Currency"
                                        sx={{color:"white",m:0,p:0,ml:1,"&& > *":{m:0,p:0,color:"white",border:"none",fontFamily:"inherit",fontSize:"15px !important"}}}
                                      >
                                        <MenuItem value={"USD"}>USD</MenuItem>
                                        <MenuItem value={"EUR"}>EUR</MenuItem>
                                        <MenuItem value={"TRL"}>TRL</MenuItem>
                                      </Select>
                                    
                                  </Grid>
                                
                              </Grid>
                              
                             
                        </Grid>

                    
                  </AppBar>
          </HideOnScroll>
          


          <ElevationScroll {...props}>
                  <AppBar id="secondappbar"  sx={{mt:5,position:"fixed",boxShadow:"none !important",backgroundColor:"#f6f9fc"}}>
                    
                        <Grid container direction="row"  spacing={2} sx={{height:"100% !important",alignItems:"center",textAlign:"-webkit-center"}}> {/* height:80, */}

                              <Grid item xs={3}>
                                
                                  <Typography
                                  noWrap
                                  component="div"
                                  sx={{ mr: 2,ml: 0,display:"flex",justifyContent:"center", alignItems:"center" }} 
                                  underline="none"
                                            >
                                    {/* <Link  color="inherit" underline="none" sx={{ mr: 2,ml: 0, display: { xs: 'block', md: 'flex' } }}><img src={logo} className="App-logo" alt="logo" /></Link> */}

                                  <Link className="AppLogo" to="/"><img src={logo} style={{/* mixBlendMode: "screen", pointerEvents:"none",display:"flex",*/height: "64px",zIndex:1000}}   alt="logo" /></Link>
                                  <Typography sx={{color:"black !important",display:"flex",alignItems:"center"}}><Typography sx={{color:"black !important",fontSize:"40px",fontFamily:"math"}}>P</Typography>azaar</Typography>
                                  </Typography>

                              </Grid>


                              <Grid item xs={6}>
                                
                                  {/* Search Component */}
                                        <Search />


                              </Grid>



                              <Grid container direction="row" item xs={3} sx={{height:"100% !important",alignItems:"center",textAlign:"-webkit-center"}}>

                                  <Grid item xs={6}>

                                   {/*------------------------ Account------------------------*/}    
                                      {

                                      user ? <div>

                                        <IconButton
                                                      size="large"
                                                      aria-label="account of current user"
                                                      aria-controls="menu-appbar"
                                                      aria-haspopup="true"
                                                      onClick={handleMenu}
                                                      color="inherit"
                                                      sx={{color: 'black',fontWeight: 'bold',fontSize: 'h5.fontSize' }}
                                                    >
                                                      <AccountCircle sx={{fontSize: [45,40],m:"0",p:"0" }}/><p className={sty.proP}>{user.email.split('@')[0]}</p>
                                        </IconButton>


                                        <Menu
                                                      id="menu-appbar"
                                                      anchorEl={anchorEl}
                                                      
                                                      keepMounted
                                                      
                                                      open={anchorEl}
                                                      onClose={handleClose}
                                                    >
                                                      <MenuItem onClick={handleClose}>Profile</MenuItem>
                                                      <MenuItem onClick={handleClose}>My account</MenuItem>
                                                      <MenuItem onClick={logOut}><ExitToAppIcon />Logout</MenuItem>
                                        </Menu>
                                                    
                                      </div> : null
                                      
                                      
                                      }
 
                                    </Grid>



                                  <Grid item xs={6}>

                                         {/*------------------------Cart ------------------------*/}
                                       <Link to="/cart" style={{marginLeft:"5px",display:"flex"}} className={sty.link}><Badge badgeContent={cart.length == 0 ? undefined : cart.length} anchorOrigin={{vertical: 'top', horizontal: 'left',}} color={cart.length == 0 ? undefined : "error"} ><LocalGroceryStoreOutlinedIcon sx={{fontSize:"30px !important",color:"black"}} /></Badge><Typography sx={{color:"black"}}>Cart</Typography></Link>


                                  </Grid>



                              </Grid>
                          
                          
                        </Grid>
                    
                  </AppBar>
          </ElevationScroll>



          <HideOnScroll {...props}>
                  <AppBar   sx={{mt:10,position:"inherit",height:40,boxShadow:"none !important",zIndex:10,backgroundColor:"red"}}>
                    
                      <Grid container direction="row" spacing={2}>

                          <Grid item xs={8}>
                            
                            
                          </Grid>


                          <Grid item xs={4}>
                            
                            
                          </Grid>
                          
                          
                      </Grid>
                       
                    
                  </AppBar>
          </HideOnScroll>

</Box>
 </> 
  );
}

export default Header
