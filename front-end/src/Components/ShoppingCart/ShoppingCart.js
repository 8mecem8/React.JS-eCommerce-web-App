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
import ForwardOutlinedIcon from '@mui/icons-material/ForwardOutlined';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';


/* Custom Css */
import useStyles from './ShoppingCartStyles'
import PageLoader from '../../UtiComponents/page-loader';
import pic1 from "./a1.png"



//Main import components
import Footer from '../Footer/Footer';
import { userCart } from '../../UtiFunctions/utiUSer';



function ShoppingCart() {

    const sty = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const {user,cart} = useSelector(state => ({...state}))



    {/*------------------------ Function's main Loading state ------------------------*/}

    const [enterPageLoading, setEnterPageLoading] = useState(false);

    useEffect( async ()=>
    {
    setEnterPageLoading(true)
    
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setEnterPageLoading(false)

    },[])
    

    {/*------------------------ Product Quantity state and Function ------------------------*/}

    


    const handleQuantity = (e,p)=>
    {
    let count = e.target.value < 1 ? 1 : e.target.value;

    let cart = [];

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart.map((product, i) => {
        if (product._id == p._id) {
          cart[i].count = count;
        }
      });

      localStorage.setItem("cart", JSON.stringify(cart));


      dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });
    }
    }





    const HandleCartProductDelete = (p) => 
    {

    let cart

    if (typeof window !== "undefined") {
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }

      cart = Object.values(cart).filter(arg => {return arg._id !== p._id})
      
      localStorage.setItem("cart", JSON.stringify(cart));

        dispatch({
        type: "ADD_TO_CART",
        payload: cart,
      });  
    }
    }




    const saveOrderToDb = () => {
    // console.log("cart", JSON.stringify(cart, null, 4));
    userCart(cart, user.token)
      .then((res) => {
        console.log("CART POST RES", res);
        if (res.data.ok) navigate("/checkout");
      })
      .catch((err) => console.log("cart save err", err));
  };







  return (
<>
             
    {     enterPageLoading ? (<PageLoader />)  : 
    
        (
            <>
                { cart.length == 0 ? 
                
                
                (
                    
                    <Card sx={{ maxWidth: 800, width: {
                        xs: 400, 
                        sm: 600, 
                        md: 700, 
                        lg: 700, 
                        xl: 800, 
                        }, }} className={sty.container}>

                            <CardMedia component="img" image={pic1} alt="Register"/>

                        <CardContent sx={{mx:"auto"}}>

                            <Typography sx={{mx:"0px",display:"flex",justifyContent:"space-evenly"}} gutterBottom variant="h5" component="div">
                            <Link to={"/search"} className={sty.link}>Discover something unique to fill it up now <ForwardOutlinedIcon sx={{m:"0px",transform:"translate3d(0px,7px,0px)", scale:"1.3"}} />  </Link> <br/>
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            We know that you want to checkout quickly but you forgot something very important...<br/>
                            and We're eagerly awaiting your money.Remember: the more you spend, the quicker we all get to buy Lamborghinis. <SentimentVerySatisfiedOutlinedIcon sx={{m:0,p:0,transform:"translate3d(0px,9px,0px)", scale:"0.8"}} />
                            </Typography>


                        </CardContent>

                    
                        <CardContent>
                        </CardContent>


                        <CardActions>
                        </CardActions>
                        
                   
                    </Card>
                

                
                ) :

                /*------------------------ Cart with products------------------------*/
                (<Grid container direction="row" justifyContent="center"  sx={{mx:"auto",mt:8,px:{
                        xs: "0px !important", 
                        sm: "10px !important", 
                        md: "50px !important", 
                        lg: "30px !important", 
                        xl: "150px !important", 
                        }}}>



                    {/* left side */}
                    <Grid  item xs={12} sm={12} md={12} lg={8.5} xl={9} sx={{pt:5,pb:5,px:0,mx:{
                        xs: "27px !important", 
                        sm: "0px !important", 
                        md: "20px !important", 
                        lg: "0px !important", 
                        xl: "0px !important", 
                        }}}>


                            <Grid component="fieldset" container direction="column" sx={{border: 0,boxShadow: 0,width:"100%",}}>


                                {cart.map((arg,i)=>
                                {
                                    
                                    return  <Grid item sx={{mb:8}}>
                                                <Grid container direction={{
                                                        xs: "row", 
                                                        sm: "row", 
                                                        md: "row", 
                                                        lg: "row", 
                                                        xl: "row",}} spacing={2} sx={{m:"0 !important",p:"0 !important",}}>

                                                    <Grid item xs={12} sm={8} md={10} lg={10} xl={10} sx={{m:"0px !important",p:"0px !important"}}>

                                                            <Grid container direction="row" spacing={2}>

                                                                <Grid item xs={6} sm={3} md={3} lg={3} xl={3} sx={{m:{xs:"0px !important", sm:"0", md:"0",lg:"0px !important",xl:"0px !important"},mt:{xs:"0px !important", sm:"-49px !important", md:"-40px !important",lg:"-40px !important",xl:"0px !important"},height:208,width:250,p:"0 !important",}}>

                                                                    <CardMedia
                                                                        component="img"
                                                                        height="194"
                                                                        image={arg.images[0].url}
                                                                        alt="image"
                                                                        sx={{p:0,t:0,my:"auto",objectFit:"contain !important"}}
                                                                    />

                                                                </Grid>

                                                                <Grid item xs={6} sm={8} md={6} lg={6} xl={7} sx={{m:"0px !important",p:"0 !important",}}>
                                                                    <Typography component="div" gutterBottom variant="body1" s color="#3d4e5a" fontSize={{xs:"0.74em", sm:"0.6em", md:"0.8em",lg:"0.8em",xl:"0.8em"}} letterSpacing={{xs:"0.000068em", sm:"0.000028em", md:"0.068em",lg:"0.068em",xl:"0.068em"}}>{<Link target="_blank" to={`/product/${arg.slug}`} style={{textDecoration:"none",marginLeft:"1px",marginRight:"1px"}}>{arg.title}..</Link>}</Typography>
                                                                </Grid>

                                                                <Grid item xs={12} sm={1} md={2} lg={1} xl={1} sx={{m:"0px !important",p:"0 !important",display:"inline-grid"}}>
                                                                    <Typography component="fieldset" gutterBottom sx={{pl:1,border: 0,boxShadow: 0,}} variant="body1" fontSize="0.8rem">{arg.color}</Typography>
                                                                </Grid>
                                                        
                                                        
                                                        
                                                            </Grid>
                                                    </Grid>


                                                    <Grid item xs={6} sm={3} md={1} lg={1} xl={1} 
                                                    sx={{m:"0px !important",
                                                    p:"0px !important",
                                                    display:"inline-grid",
                                                    transform:{xs:"translate3d(30px,-50px,0px)", sm:"translate3d(-5px,0px,0px)", md:"translate3d(-35px,0px,0px)",lg:"translate3d(-55px,0px,0px)",xl:"translate3d(-20px,0px,0px)"},
                                                    justifyItems:{xs:"center", sm:"center", md:"center",lg:"center",xl:"center"}}}>

                                                    
                                                        <Select
                                                            labelId="simple-select-label"
                                                            id="simple-select"
                                                            value={arg.count}
                                                            onChange={(e)=>{handleQuantity(e,arg)}}
                                                            sx={{width:"69px",height:"51px"}}
                                                        >
                                                            {  
                                                              new Array(arg.quantity).fill().map((x,i)=>
                                                              {

                                                                return <MenuItem value={i+1}>{i+1}</MenuItem>

                                                              })
                                                            }
                                                            
                                                        </Select>

                                                    </Grid>


                                                    <Grid item xs={6} sm={1} md={1} lg={1} xl={1} sx={{
                                                    transform:{xs:"translate3d(-15px,-55px,0px)", sm:"translate3d(-40px,0px,0px)", md:"translate3d(0px,0px,0px)",lg:"translate3d(-20px,0px,0px)",xl:"translate3d(0px,0px,0px)"},
                                                    m:"0px !important",p:"0px !important",display:"inline-grid",justifyItems:{xs:"flex-start", sm:"center", md:"flex-end",lg:"flex-end",xl:"flex-end"}}}>

                                                        <Typography component="div" variant="body1" sx={{fontSize:{xs:"40px", sm:"35px", md:"35px",lg:"35px",xl:"35px"}}} fontWeight={{xs:"700", sm:"700", md:"700",lg:"700",xl:"700"}}>${arg.price*arg.count}</Typography>

                                                        <Button onClick={()=>{HandleCartProductDelete(arg)}} variant="text"  sx={{textTransform: "none",height:{xs:"18px", sm:"15px", md:"15px",lg:"10px",xl:"10px"},fontSize:{xs:"25px", sm:"15px", md:"15px",lg:"10px",xl:"10px"},transform:{xs:"translate3d(137px,-41px,0px)", sm:"translate3d(20px,-40px,0px)", md:"translate3d(10px,-45px,0px)",lg:"translate3d(15px,-40px,0px)",xl:"translate3d(13px,-60px,0px)"},}}>remove</Button>

                                                    </Grid>


                                                </Grid>
                                                <Divider />
                                            </Grid>
                                            



                                })}
                                

                                <Grid item>

                                    
                                </Grid>

                                <Grid item>

                                    
                                </Grid>


                            </Grid>
 


                    </Grid>



                    {/* right side */}
                    <Grid item xs={12} sm={12} md={12} lg={3.5} xl={3} sx={{margin: {
                        xs: "0px !important", 
                        sm: "auto !important", 
                        md: "0px !important", 
                        lg: "0px !important", 
                        xl: "0px !important", 
                        },px:{
                        xs: "0px !important", 
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

                                <Divider />


                                <Grid container direction="row" justifyContent="space-between" alignItems="start" spacing={2} sx={{width:"100%",mt:"1px !important"}}>
                                    
                                    <Grid item >
                                     <Typography component="div" gutterBottom variant="body2">Item(s) Total</Typography> 
                                    </Grid>

                                    <Grid item >
                                     <Typography component="div" gutterBottom variant="body2">${cart.reduce((pre,cur)=>{ return pre+(cur.price * cur.count)},0)}</Typography> 
                                    </Grid>

                                </Grid> 
                                
                                 <Grid container direction="row" justifyContent="space-between" alignItems="start" spacing={2} sx={{width:"100%",mb:"1px !important",}}>
                                    
                                    <Grid item >
                                     <Typography component="div" gutterBottom variant="body2">Estimated Sales Tax</Typography> 
                                    </Grid>

                                    <Grid item >
                                     <Typography component="div" gutterBottom variant="body2">${Math.floor(cart.reduce((pre,cur)=>{ return pre+(cur.price * cur.count)},0)* 0.085)}</Typography> 
                                    </Grid>

                                </Grid>

                                <Divider />

                                {/* ------------------------ Total Price for Products------------------------ */}
                                <Grid container direction="row" justifyContent="space-between" alignItems="start" spacing={2} sx={{width:"100%",mt:"1px !important"}}>
                                    
                                    <Grid item >
                                     <Typography component="div" gutterBottom variant="body1">Total</Typography> 
                                    </Grid>

                                    <Grid item >
                                     <Typography component="div" gutterBottom variant="body1">${Math.floor(cart.reduce((pre,cur)=>{ return pre+(cur.price * cur.count)},0) + cart.reduce((pre,cur)=>{ return pre+(cur.price * cur.count)},0)* 0.085)}</Typography> 
                                    </Grid>

                                </Grid> 

                                <Box sx={{mx:"auto !important",alignItems:"center",display:"flex"}}>
                                    <Button 
                                        sx={{mx:"auto",width:"360px !important",height:"50px !important",bgcolor:"#ffe000",color:"#040c13",'&:hover': {backgroundColor: '#ffe94d',},}}
                                        size="medium" 
                                        variant="contained"
                                        
                                        checkout
                                        onClick={user ? ()=>{saveOrderToDb()} : ()=>{navigate("/login",{state:{from: `/cart`}})}}
                                            
                                        
                                        /* startIcon={} */
                                        >{user ? <Typography component="div" variant="body1" sx={{m:0,p:0}}>Checkout</Typography> : <Typography component="div" variant="body1" sx={{m:0,p:0}}>Login to Checkout</Typography>} </Button>
                                </Box>


                            </Grid>

                            {/* ------------------------ Down part of right side------------------------ */}
                            <Grid item xs={6} sx={{m:0,p:0,}}>

                                downside

                            </Grid>

                        </Grid>



                    </Grid>



                </Grid>)}
            </>
        )
    
    
    }

    <Divider variant="middle" sx={{mx:12}}/>

           


            {/* Footer Component */}
            <Footer/>
      
      
</>
  )
}

export default ShoppingCart;
