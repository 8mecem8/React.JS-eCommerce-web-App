import React,{useState,useEffect} from 'react'
import  {Link,useNavigate} from "react-router-dom";
import { useDispatch,useSelector } from 'react-redux';



// Material UI
import { Button, CircularProgress} from '@mui/material';
import { Box } from '@mui/system';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import SentimentVerySatisfiedOutlinedIcon from '@mui/icons-material/SentimentVerySatisfiedOutlined';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

/* Custom Css */
import useStyles from './CheckoutStyles'
import PageLoader from '../../UtiComponents/page-loader';
import pic1 from "./a1.png"



//Main import components
import Footer from '../Footer/Footer';
import { getUserCart, saveUserAddress } from '../../UtiFunctions/utiUSer';



function Checkout() {

    const sty = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const {user,cart} = useSelector(state => ({...state}))



    {/*------------------------ Function's main Loading state ------------------------*/}

    const [enterPageLoading, setEnterPageLoading] = useState(false);
    const [address, setaddress] = useState("No Shipping address entered");
    const [sAddress, setSAddress] = useState();
    const [savedAddress, setSavedAddress] = useState(false);

    {/*------------------------ Fetched User Cart state ------------------------*/}

    const [fuc, setFuc] = useState([]);

    useEffect( async ()=>
    {
    setEnterPageLoading(true)
    

     await getUserCart(user?.token)
                .then((r)=>{setFuc(r.data)})
                .catch((err)=>console.log(err)) 
    
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setEnterPageLoading(false)

    },[user])
    




    const handleAddress = async (event) =>
    {
        event.preventDefault() 
    
        setaddress(sAddress)

        await new Promise((resolve) => setTimeout(resolve, 1500));
        console.log("r",sAddress)
        await saveUserAddress(user.token,sAddress)
                    .then((r)=>{return  setSavedAddress(true)})
                    .catch((err)=>{console.log("error is ==>",err)})
    }




  return (
<>
             
    {    enterPageLoading ? (<PageLoader />)  : 
    
        (

            <>{
                    

                  user &&  <Grid container direction="row" justifyContent="center"  sx={{mx:"auto",mt:8,px:{
                        xs: "4px !important", 
                        sm: "10px !important", 
                        md: "30px !important", 
                        lg: "30px !important", 
                        xl: "150px !important", 
                        }}}>



                    {/* left side */}
                    <Grid  item xs={12} sm={12} md={12} lg={7} xl={7} sx={{pt:0,pb:5,px:0,mx:{
                        xs: "27px !important", 
                        sm: "0px !important", 
                        md: "20px !important", 
                        lg: "0px !important", 
                        xl: "0px !important", 
                        }}}>


                                    <Box sx={{mx:"auto !important",alignItems:"flex-start",display:"flex"}}>
                                        <Typography gutterBottom variant="h5" sx={{}}>Getting your order</Typography>
                                    </Box>

                            <Divider  />

                            <Grid component="fieldset" container direction="column" sx={{border: 0,boxShadow: 0,width:"100%",}}>


                                
                                

                                <Grid item>
                                    <Box sx={{mx:"auto !important",alignItems:"flex-start",display:"flex"}}>
                                        <Typography gutterBottom variant="h6" sx={{}}>Shipping Information</Typography>
                                    </Box>
                                    
                                </Grid>

                                <Grid item>
                                    <form onSubmit={(event)=>{ handleAddress(event)}}>
                                    <TextField label="Address" onChange={(e)=>{setSAddress(e.target.value)}} color="success" fullWidth />
                                    <Button type='submit' variant="outlined">{address !== "No Shipping address entered" && " " ? "Change Address": "Add Shipping Address"}</Button>
                                    </form>
                                </Grid>

                                <Grid item sx={{mt:4}}>
                                    <Typography gutterBottom variant="h7" sx={{mt:2}}>Current Shipping Address:<br/></Typography>
                                    <Typography gutterBottom variant="body1" fontWeight="600" sx={{mt:1}}>{address}</Typography>
                                </Grid>

                            </Grid>
 
                            <Box sx={{mt:6,mx:"auto !important",alignItems:"center",display:"flex"}}>
                                    <Button 
                                        sx={{mx:"auto",width:"360px !important",height:"50px !important",bgcolor:"#ffe000",color:"#040c13",'&:hover': {backgroundColor: '#ffe94d',},}}
                                        size="medium" 
                                        variant="contained"
                                        disabled={!savedAddress}
                                        onClick={user ? ()=>{navigate("/payment")} : ()=>{navigate("/login",{state:{from: `/cart`}})}}
                                            
                                        
                                        /* startIcon={} */
                                        >{user ? <Typography component="div" variant="body1" sx={{m:0,p:0}}>Proceed to Payment</Typography> : <Typography component="div" variant="body1" sx={{m:0,p:0}}>Login to Checkout</Typography>} </Button>
                            </Box>

                    </Grid>



                    {/* right side */}
                    <Grid item xs={12} sm={12} md={12} lg={5} xl={5} sx={{margin: {
                        xs: "0px !important", 
                        sm: "auto !important", 
                        md: "0px !important", 
                        lg: "0px !important", 
                        xl: "0px !important", 
                        },px:{
                        xs: "4px !important", 
                        sm: "auto !important", 
                        md: "5px !important", 
                        lg: "30px !important", 
                        xl: "30px !important", 
                        },pt:"2px !important"}}>

                        <Box sx={{mx:"auto !important",alignItems:"center",display:"flex"}}>
                            <Typography gutterBottom variant="h5" sx={{mx:"auto !important"}}>Order Summary</Typography>
                        </Box>

                        

                        <Grid container direction="column" justifyContent="center" alignItems="start" spacing={2} sx={{mx:"auto !important",m:0,p:0,maxWidth:"500px !important"}}>

                        

                            {/* ------------------------ Upper part of right side------------------------ */}
                            <Grid item xs={6}  sx={{width:"100%",m:"6px !important",p:"0 !important"}}>



                                 <Grid container direction="row" justifyContent="space-between" alignItems="start" spacing={2} sx={{width:"100%",mt:"1px !important"}}>
                                    
                                    


                                         {cart.map((arg,i)=>
                                {
                                    
                                    return  <Grid item sx={{mb:0,ml:2,mr:2}}>
                                                <Grid container direction={{
                                                        xs: "row", 
                                                        sm: "row", 
                                                        md: "row", 
                                                        lg: "row", 
                                                        xl: "row",}} spacing={2} sx={{m:"0 !important",p:"0 !important",}}>

                                                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12} sx={{m:"0px !important",p:"0px !important"}}>

                                                            <Grid container direction="row" spacing={2}>

                                                                <Grid item xs={2} sm={3} md={3} lg={3} xl={3} sx={{m:{xs:"0px !important", sm:"0", md:"0",lg:"0px !important",xl:"0px !important"},mt:{xs:"0px !important", sm:"0px !important", md:"0px !important",lg:"0px !important",xl:"0px !important"},height:120,width:250,p:"0 !important",}}>

                                                                    <CardMedia
                                                                        component="img"
                                                                        height="160"
                                                                        image={arg.images[0].url}
                                                                        alt="image"
                                                                        sx={{p:0,t:0,mt:"-40px !important",objectFit:"contain !important"}}
                                                                    />

                                                                </Grid>

                                                                <Grid item xs={10} sm={9} md={9} lg={9} xl={9} sx={{m:"0px !important",p:"0 !important",}}>
                                                                    <Typography component="div" gutterBottom variant="body1" s color="#3d4e5a" fontSize={{xs:"0.74em", sm:"0.6em", md:"0.8em",lg:"0.8em",xl:"0.8em"}} letterSpacing={{xs:"0.000068em", sm:"0.000028em", md:"0.068em",lg:"0.068em",xl:"0.068em"}}>{<Link target="_blank" to={`/product/${arg.slug}`} style={{textDecoration:"none",marginLeft:"1px",marginRight:"1px"}}>{arg.title.slice(0,50)}..</Link>}</Typography>
                                                                    <Grid container direction="row" alignItems="center">

                                                                        <Grid item xs={6} sm={6} md={6} lg={6} xl={6} sx={{m:"0px !important",p:"0 !important",display:"inline-grid"}}>
                                                                            <Typography component="fieldset" gutterBottom sx={{m:"0px !important",p:"0 !important",border: 0,boxShadow: 0,}} variant="caption" >Color:&nbsp;{arg.color}</Typography>
                                                                        </Grid>

                                                                        <Grid item xs={3} sm={3} md={3} lg={3} xl={3} sx={{m:"0px !important",p:"0 !important",display:"inline-grid"}}>
                                                                            <Typography component="fieldset" gutterBottom sx={{m:"0px !important",p:"0 !important",border: 0,boxShadow: 0,}} variant="caption" >Quantity:&nbsp;{arg.quantity}</Typography>
                                                                        </Grid>

                                                                        <Grid item xs={3} sm={3} md={3} lg={3} xl={3} sx={{m:"0px !important",p:"0 !important",display:"inline-grid",justifyItems:"flex-end"}}>
                                                                            <Typography component="div" variant="body1" sx={{fontSize:{xs:"20px", sm:"15px", md:"15px",lg:"15px",xl:"15px"}}} fontWeight={{xs:"200", sm:"200", md:"200",lg:"200",xl:"200"}}>${arg.price*arg.count}</Typography>
                                                                        </Grid>

                                                                    </Grid>
                                                                </Grid>


                                                        
                                                            </Grid>
                                                    </Grid>


                    

                                                </Grid>
                                                
                                            </Grid>
                                            



                                })}


                                </Grid> 



                                <Divider />


                                <Grid container direction="row" justifyContent="space-between" alignItems="start" spacing={2} sx={{width:"100%",mt:"1px !important"}}>
                                    
                                    <Grid item >
                                     <Typography component="div" gutterBottom variant="body2">Subtotal</Typography> 
                                    </Grid>

                                    <Grid item >
                                     <Typography component="div" gutterBottom variant="body2">${fuc.cartTotal}</Typography> 
                                    </Grid>

                                </Grid> 
                                
                                 <Grid container direction="row" justifyContent="space-between" alignItems="start" spacing={2} sx={{width:"100%",mb:"1px !important",}}>
                                    
                                    <Grid item >
                                     <Typography component="div" gutterBottom variant="body2">Estimated Sales Tax</Typography> 
                                    </Grid>

                                    <Grid item >
                                     <Typography component="div" gutterBottom variant="body2">${Math.floor(fuc.cartTotal * 0.085)}</Typography> 
                                    </Grid>

                                </Grid>

                                <Divider />

                                {/* ------------------------ Total Price for Products------------------------ */}
                                <Grid container direction="row" justifyContent="space-between" alignItems="start" spacing={2} sx={{width:"100%",mt:"1px !important"}}>
                                    
                                    <Grid item >
                                     <Typography component="div" gutterBottom variant="body1">Total</Typography> 
                                    </Grid>

                                    <Grid item >
                                     <Typography component="div" gutterBottom variant="body1">${fuc.cartTotal + Math.floor(fuc.cartTotal * 0.085)}</Typography> 
                                    </Grid>

                                </Grid> 

                                


                            </Grid>

                            {/* ------------------------ Down part of right side------------------------ */}
                            <Grid item xs={6} sx={{m:0,p:0,}}>

                                {/* downside */}

                            </Grid>

                        </Grid>



                    </Grid>



                </Grid>

            }                     


                <Divider variant="middle" sx={{mx:12}}/>

                


                    {/* Footer Component */}
                    <Footer/>
            
    
            </>
        )
    }
</>
)
}

export default Checkout;
