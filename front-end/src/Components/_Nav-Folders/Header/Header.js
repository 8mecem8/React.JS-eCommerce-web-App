import React, {useState,useLayoutEffect} from 'react';
import  {Link} from "react-router-dom";
import firebase from 'firebase/compat/app';
import { useSelector, useDispatch } from 'react-redux'

/* Material Uİ */
import { CardMedia, Divider } from '@mui/material';
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
import PersonAddAltSharpIcon from '@mui/icons-material/PersonAddAltSharp';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import GridGoldenratioIcon from '@mui/icons-material/GridGoldenratio';
import PasswordIcon from '@mui/icons-material/Password';
import StormIcon from '@mui/icons-material/Storm';




/* Custom Css */
import useStyles from './HeaderStyles'
import './Header.css'

import logo from '../../../logo.png';
import { height } from '@mui/system';
import Search from '../../../UtiComponents/search/SearchProducts';



import proPic from './1.png';

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


    
  const [anchorEl, setAnchorEl] = useState(null);
  const [adminDashboardStatus, setAdminDashboardStatus] = useState(false);
  const [burgerMenu, setBurgerMEnu] = useState(false);
  
  


{/*------------------------Admin DashBoard ------------------------*/}



 const aDashboardClick = (event) => {
    //When there is a new render Set page position to 0 at Y axis
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;


    setAdminDashboardStatus(!adminDashboardStatus);
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

    if(window.scrollY <= 1){return  el.style.transition = "all 0.0001ms !important" ,el.style.marginTop = "40px"}
 })






  return (
<>
  
<Box sx={{ display:"flex",flexDirection:"column", flexGrow: 1 , backgroundColor:"#f6f9fc"}}>

     
          {/* ------------------------------------------------Top Bar for Phone number, Info email, Help page,Currency change------------------------------------------------------------------ */}    
          <HideOnScroll {...props}>
                  <AppBar   sx={{position:"inherit",height:35,boxShadow:"none !important"}}>
                    
                      
                        <Grid container direction="row" sx={{height:"100% !important"}}>

                              <Grid container direction="row" sx={{height:"100% !important",justifyContent:{xs:"start !important", sm:"center !important", md:"center !important",lg:"center !important",xl:"center !important"}}} item xs={6}>

                                  <Grid item xs={6} sm={6} sx={{display:"flex",alignItems:"center",justifyContent:{xs:"start !important", sm:"center !important", md:"center !important",lg:"center !important",xl:"center !important"}}}>
                                
                                    <LocalPhoneIcon sx={{fontFamily:"inherit",fontSize:{xs:"20px !important", sm:"21px !important", md:"22px !important",lg:"24px !important",xl:"25px !important"}}} />
                                    <Typography sx={{fontFamily:"inherit",fontSize:{xs:"10px !important", sm:"11px !important", md:"12px !important",lg:"14px !important",xl:"15px !important"}}}>+1 646 334 67 33</Typography>

                                  </Grid>

                                  <Grid item xs={2} sm={2} sx={{display:"flex",alignItems:"center"}}>
                                
                                    <EmailIcon sx={{fontFamily:"inherit",fontSize:{xs:"20px !important", sm:"21px !important", md:"22px !important",lg:"24px !important",xl:"25px !important"}}} />
                                    <Typography sx={{fontFamily:"inherit",fontSize:{xs:"10px !important", sm:"11px !important", md:"12px !important",lg:"14px !important",xl:"15px !important"}}}>&nbsp;info@pazaar.com</Typography>
                                
                                  </Grid>
                                
                              </Grid>

                              <Grid container direction="row" sx={{height:"100% !important",justifyContent:{xs:"end !important", sm:"center !important", md:"center !important",lg:"center !important",xl:"center !important"}}} item xs={6}>
                                
                                  <Grid item xs={4} sm={4} sx={{display:"flex",alignItems:"center"}}>

                                    <ContactSupportIcon sx={{fontFamily:"inherit",fontSize:{xs:"20px !important", sm:"21px !important", md:"22px !important",lg:"24px !important",xl:"25px !important"}}} />
                                    <Typography sx={{fontFamily:"inherit",fontSize:{xs:"10px !important", sm:"11px !important", md:"12px !important",lg:"14px !important",xl:"15px !important"}}}>Help Page</Typography>

                                  </Grid>
                                  

                                  <Grid item xs={4} sm={4} sx={{display:"flex",alignItems:"center"}}>

                                    <CurrencyExchangeIcon sx={{fontFamily:"inherit",fontSize:{xs:"18px !important", sm:"19px !important", md:"20px !important",lg:"21px !important",xl:"22px !important"}}} />
                                    {/* <Typography>Choose Currency</Typography> */}
                                    <Select
                                        variant="standard"
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        defaultValue="USD"
                                        label="Currency"
                                        sx={{color:"white",m:0,p:0,ml:1,"&& > *":{m:0,p:0,color:"white",border:"none",fontFamily:"inherit",fontSize:{xs:"10px !important", sm:"11px !important", md:"12px !important",lg:"14px !important",xl:"15px !important"}}}}
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
          

          {/* ------------------------------------------------Main Bar for Logo, Search , Cart------------------------------------------------------------------ */}
          
          <ElevationScroll {...props}>
                  <AppBar id="secondappbar"  sx={{mt:"35px",position:"fixed",boxShadow:"none !important",backgroundColor:"#f6f9fc",transition:"all 1s !important"}}>
                    
                        <Grid container direction="row"  spacing={0} sx={{m:"0px !important",height:"100% !important",alignItems:"center",textAlign:"-webkit-center"}}> {/* height:80, */}


                              {/*------------------------ logo ------------------------*/}
                              <Grid item xs={3}>
                                
                                  <Typography
                                  noWrap
                                  component="div"
                                  sx={{ mr: 2,ml: 0,display:"flex",justifyContent:"center", alignItems:"center" }} 
                                  underline="none"
                                  >
                                    {/* <Link  color="inherit" underline="none" sx={{ mr: 2,ml: 0, display: { xs: 'block', md: 'flex' } }}><img src={logo} className="App-logo" alt="logo" /></Link> */}

                                      <Link className="AppLogo" to="/"><img src={logo} style={{/* mixBlendMode: "screen", pointerEvents:"none",display:"flex",*/height: "64px",zIndex:1000,marginTop:"10px"}}   alt="logo" /></Link>
                                      <Typography sx={{m:"0px !important",color:"black !important",display:{xs:"none", sm:"none", md:"flex",lg:"flex",xl:"flex"},alignItems:"center"}}><Typography sx={{color:"black !important",fontSize:"40px",fontFamily:"math"}}>P</Typography>azaar</Typography>
                                  </Typography>

                              </Grid>





                              {/*--------------------- Search Component --------------------- */}
                              <Grid item xs={5.5} sm={6}>
                                
                                        <Search />

                              </Grid>





                              <Grid container direction="row" item xs={3} sx={{height:"100% !important",alignItems:"center",textAlign:"-webkit-center"}}>



                                  {/*------------------------ Account------------------------*/}    
                                  <Grid item xs={6} sm={6}>

                                     

                                        <IconButton
                                                      size="large"
                                                      aria-label="account of current user"
                                                      aria-controls="menu-appbar"
                                                      aria-haspopup="true"
                                                      onClick={handleMenu}
                                                      color="inherit"
                                                      sx={{color: 'black',fontWeight: 'bold',fontSize: 'h5.fontSize',p:0,m:0 }}
                                                    >
                                                      {/* <AccountCircle sx={{fontSize: [45,40],m:"0",p:"0" }}/> */} {/* <img src={proPic} style={{height:"29px",}}/> */} 
                                                      <CardMedia  component="img" image={proPic} alt="profile picture" sx={{height:["41px","38px","38px","38px","29px"],t:0,mr:1,}}/>
                                                <Typography  sx={{display:{xs:"none", sm:"none", md:"none",lg:"none",xl:"inline"}}} className={sty.proP}>{user?.email.split('@')[0]}</Typography>
                                        </IconButton>


                                        {user ? <Menu
                                                      id="menu-appbar"
                                                      anchorEl={anchorEl}
                                                      
                                                      onMouseLeave={handleClose}
                                                      onPointerLeave={handleClose}
                                                      anchorOrigin={{vertical: 'top',horizontal: 'right',}}
                                                      open={anchorEl}
                                                      onClose={handleClose}
                                                      onClick={handleClose}
                                                      sx={{transform:"translate3d(-250px,100px,0px)!important"}}
                                                    >
                                                      <Link to="/user/History" className={sty.link} style={{color: 'black',fontSize: '0.3em',fontWeight:100}}><MenuItem><Button variant="text"  startIcon={<GridGoldenratioIcon />} sx={{color: 'black',fontWeight: '100',fontSize: 'subtitle2'  }}>History</Button></MenuItem></Link>
                                                      <Link to="/user/Password" className={sty.link} style={{color: 'black',fontSize: '0.3em',fontWeight:100}}><MenuItem><Button variant="text"  startIcon={<PasswordIcon />} sx={{color: 'black',fontWeight: '100',fontSize: 'subtitle2'  }}>Password</Button></MenuItem></Link>
                                                      <Link to="/user/Wishlist" className={sty.link} style={{color: 'black',fontSize: '0.3em',fontWeight:100}}><MenuItem><Button variant="text"  startIcon={<StormIcon />} sx={{color: 'black',fontWeight: '100',fontSize: 'subtitle2'  }}>Wishlist</Button></MenuItem></Link>
                                                      <MenuItem onClick={logOut}><ExitToAppIcon />Logout</MenuItem>
                                        </Menu>
                                        
                                        
                                        : <Menu
                                                      id="menu-appbar"
                                                      anchorEl={anchorEl}
                                                      anchorOrigin={{vertical: 'top',horizontal: 'right',}}
                                                      onMouseLeave={handleClose}
                                                      onPointerLeave={handleClose}
                                                      onClick={handleClose}
                                                      open={anchorEl}
                                                      onClose={handleClose}
                                                      sx={{transform:"translate3d(-250px,100px,0px)!important"}}
                                                    >
                                                      {/*------------------------ Login and register ------------------------*/}
                                                      <MenuItem><Button variant="text"  startIcon={<LoginIcon />} sx={{color: 'black',fontWeight: 'bold',fontSize: 'h5.fontSize'  }}><Link to="/login" className={sty.link} style={{color: 'black',fontSize: '0.7em',fontWeight:400}}>Login</Link></Button></MenuItem>
                                                      <MenuItem><Button variant="text"  startIcon={<PersonAddAltSharpIcon />} sx={{color: 'black',fontWeight: 'bold',fontSize: 'h5.fontSize' }}><Link to="/register" className={sty.link} style={{color: 'black',fontSize: '0.7em',fontWeight:400}}>Register</Link></Button></MenuItem>
                  
                                        </Menu>
                                        
                                   
                                      
                                      
                                      }

                                      {/*------------------------ Login and register ------------------------*/}


                                      {/* {false && (<Stack spacing={0.5} divider={<Divider orientation="vertical" flexItem />} direction="row" >
                                                  
                                                
                                                <Button variant="text"  startIcon={<LoginIcon />} sx={{color: 'black',fontWeight: 'bold',fontSize: 'h5.fontSize'  }}><Link to="/login" className={sty.link} style={{color: 'black',fontSize: '0.7em',fontWeight:400}}>Login</Link></Button>
                                                <Button variant="text"  startIcon={<PersonAddAltSharpIcon />} sx={{color: 'black',fontWeight: 'bold',fontSize: 'h5.fontSize' }}><Link to="/register" className={sty.link} style={{color: 'black',fontSize: '0.7em',fontWeight:400}}>Register</Link></Button>
                                        </Stack> )} */}


 
                                  </Grid>


                                  {/*------------------------ Shopping Cart ------------------------*/}
                                  <Grid item xs={6}>

                                         {/*------------------------Cart ------------------------*/}
                                       <Link to="/cart" style={{marginLeft:"5px",display:"flex",alignItems:"center"}} className={sty.link}><Badge badgeContent={cart.length == 0 ? undefined : cart.length} anchorOrigin={{vertical: 'top', horizontal: 'left',}} color={cart.length == 0 ? undefined : "error"} ><LocalGroceryStoreOutlinedIcon sx={{fontSize:"27px !important",color:"black"}} /></Badge><Typography sx={{color:"black",fontFamily:"system-ui",fontSize:"26px"}}>Cart</Typography></Link>


                                  </Grid>



                              </Grid>
                          
                          
                        </Grid>
                    
                  </AppBar>
          </ElevationScroll>


          {/* ------------------------------------------------Last Bar------------------------------------------------------------------ */}

          <HideOnScroll {...props} >
                  <AppBar   sx={{mt:"88px",position:"inherit",minHeight:40,boxShadow:"0px 4px 16px rgb(43 52 69 / 10%) !important",zIndex:10,backgroundColor:"#f6f9fc",justifyContent:"center",textAlign:"center"}}>
                    
                      <Grid container direction="row" spacing={2}>


                          {/* -------- Left Side --------- */}
                          <Grid container direction="row" item xs={6}>
                            
                                <Grid item xs={12} sm={6}>
                                
                                      {/*------------------------Browse Link to BrowseSearch ------------------------*/}
                                      <Button  sx={{color:"black",'& > *':{color:"black"}}} startIcon={<ManageSearchIcon sx={{fontSize:"30px !important"}} />}><Link to="/search" style={{marginLeft:"-8px"}} className={sty.link}>Browse</Link></Button>
                                
                                </Grid>          




                                <Grid item xs={12} sm={6}>
                                
                                      
                                
                                </Grid>    



                          </Grid>




                          {/* -------- Right Side --------- */}
                          <Grid container direction="row" item xs={6}>
                            
                                    <Grid  item xs={12} sm={6}>
                                  
                                      
                                  
                                    </Grid>




                                    <Grid item xs={12} sm={6}>
                                      
                                       

                                    </Grid>    

                            
                          </Grid>
                          
                          
                      </Grid>
                       
                    
                  </AppBar>
          </HideOnScroll>
















    {/* ------------------------------------------------Admin Dashboard------------------------------------------------------------------ */}
    <Typography  component="div" sx={{ml:1,mb:2,p:0,':hover':{filter:"invert(1)"},transition:"all 0.8s",position:"fixed",bottom:"0px",zIndex:5000,boxShadow:"rgb(178 97 68) 0px 8px 16px 0px, inset 0px 0px 9px rgb(0 0 0 / 68%)",background:"linear-gradient(217deg, rgba(255,0,0,.8), rgba(255,0,0,0) 70.71%), linear-gradient(127deg, rgba(0,255,0,.8), rgba(0,255,0,0) 70.71%),linear-gradient(336deg, rgba(0,0,255,.8), rgba(0,0,255,0) 70.71%)",borderRadius:"23px" }}>

                {user?.role === "admin" ?<Button
                        id="demo-positioned-button"
                        aria-controls="demo-positioned-menu"
                        aria-haspopup="true"
                        
                        onClick={aDashboardClick}
                        sx={{color: 'common.white',fontWeight: 'bold',fontSize: 'subtitle1.fontSize'}}
                        
                      >
                      <p className={sty.link} style={{color:"black",fontFamily:"monospace"}}>Admin Menu</p>
                  </Button> 
                :[]} 
                  



                <Drawer  anchor={"right"} open={adminDashboardStatus} onClose={aDashboardClose} >

                    <Box >
                          <List  >
                              {[['Admin Dashboard',"dashboard"],['Category & Subcategory',"category"],[' Create New Product',"product"],['All Products, edit&delete',"products"],['Orders',"orders"]].map((text, index) =>
                              {          
                                
                                return(
                                <Link to={`/admin/${text[1]}`} className={sty.link_nav}>
                                      <ListItem button key={text}>
                                          <ListItemIcon>
                                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                          </ListItemIcon>
        
                                          <ListItemText primary={text[0]} />
                                      </ListItem>
                                </Link> 
                              )})}
                          </List>


                          {/* <Divider />
                          <List>
                            {['All mail', 'Trash', 'Spam'].map((text, index) => (
                              <ListItem button key={text}>

                                <ListItemIcon>
                                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                </ListItemIcon>

                                <Link to={`/admin/${text.split(' ')[0]}`} className={sty.link_nav}><ListItemText primary={text} /></Link>
                              </ListItem>
                            ))}
                          </List> */}


                    </Box>
                </Drawer>
    </Typography>

</Box>
 </> 
  );
}

export default Header
