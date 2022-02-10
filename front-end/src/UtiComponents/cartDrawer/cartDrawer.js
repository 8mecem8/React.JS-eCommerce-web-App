import React from 'react'
import  {useNavigate} from "react-router-dom";
import { useDispatch,useSelector } from 'react-redux';



// Material UI
import { Button} from '@mui/material';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';



function CartDrawer() {

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const {cart,cartDrawer} = useSelector(state => ({...state}))

    //console.log("cartDrawer",cartDrawer)


  return <>
  
  
  
  
  
                <Drawer anchor={"right"} open={cartDrawer} onClose={()=>dispatch({type: "SET_DRAWER", payload: !cartDrawer,})} onClick={()=>dispatch({type: "SET_DRAWER", payload: !cartDrawer,})} sx={{bgcolor:"rgba(0, 0, 0, 0.5) !important",}} >
                <Grid container direction="row" justifyContent="center" justifyItems="space-around" alignItems={"center"}>

                    <Grid item xs={12} sm={12} md={12} lg={7} xl={7} sx={{m:"0px !important",p:"0px !important",display:"grid",justifyContent:"center"}}>
                        <Typography component="fieldset" sx={{pl:1,m:"0px !important",pb:"0px !important",pt:"0px !important",pr:"0px !important",border: 0,boxShadow: 0,}} variant="body1" fontWeight={700} fontSize={window.innerWidth <= 978 ? "0.8rem !important" : "1.4rem !important"}>Items in your cart</Typography> 
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={4} xl={4} sx={{display:"contents",alignItems:"center"}}>
                        <Button sx={{mr:"0px !important",lineHeight:1.2,width:window.innerWidth <= 978 ? "140px !important" : "240px !important",height:"50px !important",bgcolor:"#ffe000",color:"#040c13",'&:hover': {backgroundColor: '#ffe94d',},}}
                            size="medium"   variant="contained" onClick={()=>{navigate("/cart")}}
                        >Go to your Cart</Button>
                    </Grid>

                </Grid>

                    <Divider />



                                    <ImageList sx={{ width: "100%" }}>



                                    

                     {cart.map((arg,i)=>
                                {
                                    
                                    return <> 
                                    
                                             <ImageListItem key={i} cols={window.innerWidth <= 978 ? 2 :1} rows={1} sx={{scale:"0.85",width:"100%",maxHeight:window.innerWidth <= 978 ? "200px !important" : "320px !important"}}>
                                                <img
                                                    src={`${arg.images[0].url}?w=248&fit=crop&auto=format`}
                                                    srcSet={`${arg.images[0].url}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                                    alt={arg.title}
                                                    loading="lazy"
                                                />
                                                <ImageListItemBar
                                                    title={arg.title.slice(0,20)}
                                                    subtitle={arg.title.slice(0,20)}
                                                    actionIcon={
                                                    <IconButton
                                                        sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                                                        aria-label={`${arg.title.slice(0,30)}`}
                                                    >
                                                        
                                                    </IconButton>
                                                    }
                                                />
                                                </ImageListItem>
                                    
                                    

                                            
                                            </> 

                                })}
                                </ImageList>
            </Drawer>
  
  
  

  
  
  </>;
}





export default CartDrawer;
