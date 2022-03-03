import React,{useState,useEffect} from 'react'
import  {Link,useNavigate} from "react-router-dom";
import { useDispatch,useSelector } from 'react-redux';
import _ from "lodash";



// Material UI
import { Button, CircularProgress} from '@mui/material';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Fab from '@mui/material/Fab';
import AddShoppingCartSharpIcon from '@mui/icons-material/AddShoppingCartSharp';
import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';
import Pagination from '@mui/material/Pagination';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';



import './NewArrivals.css'


import { getProductsByOrder,getTotalNumberProducts } from '../../../UtiFunctions/utiProduct';
import PageLoader from '../../../UtiComponents/page-loader/index'


import CartDrawer from '../../../UtiComponents/cartDrawer/cartDrawer'
import { addToWishlist } from '../../../UtiFunctions/utiUSer';


import newArrival from './newarrival.png';

{/*------------------------ Snackbar color setting ------------------------*/}
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

{/*------------------------ Snackbar slide effect ------------------------*/}
function TransitionDown(props) {
  return <Slide {...props} direction="down" />;
}








function NewArrivals() {

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const {user,cart} = useSelector(state => ({...state}))


    const ProductPerPage = 6

    {/*------------------------ Function's main state ------------------------*/}
    const [HomefetchedProductsListNewArrival, setHomeFetchedProductsListNewArrival] = useState([]);
    const [fetchedTotalNumberforProducts, setfetchedTotalNumberforProducts] = useState(0);


    {/*------------------------ Pagination State ------------------------*/}
    const [page, setPage] = useState(1);

    {/*------------------------ Cart Drawer State ------------------------*/}
    const [drawerActiveState, setDrawerActiveState] = useState(false);

    {/*------------------------ Change Tooltip Title ------------------------*/}
    const [tTipTitle, setTTipTitle] = useState([]);

    

    {/*------------------------ Function's main Loading state ------------------------*/}

    const [enterPageLoading, setEnterPageLoading] = useState(false);


     {/*------------------------ Snackbar states ------------------------*/}
    const [SnackbarOpen, setSnackbarOpen] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [snackBarMessage, setSnackBarMessage] = useState("");


    {/*------------------------ Fetch All Products as Component Started ------------------------*/}
    useEffect( async()=>
    {
        setEnterPageLoading(true)

        setTTipTitle([])

        await getTotalNumberProducts() 
                .then((arg)=>{setfetchedTotalNumberforProducts(arg.data)})
                .catch((err)=>{console.log("error in getting all products",err)})


            if (page > 2){setPage(2)}

        await  getProductsByOrder("createdAt", "desc", page, ProductPerPage)
                .then((arg)=>{setHomeFetchedProductsListNewArrival(arg.data)})
                .catch((err)=>{console.log("error in getting all products",err)})


            await new Promise((resolve) => setTimeout(resolve, 100));
        setEnterPageLoading(false)
    },[page])




    {/*------------------------ Change Tooltip Title if products added to cart or not ------------------------*/}
    useEffect(()=>
    {
        let cart = [];
        let items = []

        if (typeof window !== "undefined"){if (localStorage.getItem("cart")) {cart = JSON.parse(localStorage.getItem("cart"));}}


        cart.map(arg => { items.push(arg.slug)})

        setTTipTitle({"msg":"Added to Cart","slug":items})
       


    },[drawerActiveState])


    

    {/*------------------------ Pagination Function ------------------------*/}
    const handleChange = (event, value) => 
    {
    setPage(value);
    };




    {/*------------------------ Add to cart button Function ------------------------*/}
    const HandleAddToCart = (product) => 
    {


        // create cart array
        let cart = [];


        if (typeof window !== "undefined") {
        // if cart is in local storage GET it

            if (localStorage.getItem("cart")) {
                 cart = JSON.parse(localStorage.getItem("cart"));
        }


        // push new product to cart
        cart.push({
            ...product,
            count: 1,
        });


        // remove duplicates
        let unique = _.uniqWith(cart, _.isEqual);
        // save to local storage
        // console.log('unique', unique)
        localStorage.setItem("cart", JSON.stringify(unique));
        

        // add to reeux state
        dispatch({
            type: "ADD_TO_CART",
            payload: unique,
        });
    }


    }






     {/*------------------------ Add to Wish List button Function ------------------------*/}
    const HandleAddToWishList = async(id,title) => 
    {

         await new Promise((resolve) => setTimeout(resolve, 1500));

        addToWishlist(id,user.token)
                .then((arg)=>
            {
             
            
            setSnackBarMessage(`Product ${title} is succesfuly added to your Wishlist`)
            setSnackbarOpen(true)
            
            })
            .catch((error)=>
            {
            
            setErrorMessage(error?.response?.data || error.message)
            setError(true)
           
            })
    }






    return (
        <>
    {     enterPageLoading ? (<PageLoader />)  : 
      (      
          
        <>
          
          <Container sx={{maxWidth:"1431px !important",mx: "auto",pt:2,pl:"6px !important",pr:"27px !important"}}>

            {/* <p>New arrivals</p> */}
            <br />
            <br />


            <Badge sx={{m:"0px !important"}}  anchorOrigin={{vertical: 'top',horizontal: 'right',}} badgeContent={ <CardMedia  component="img" image={newArrival} alt="profile picture" sx={{transform:["translate3d(-65px,38px,0px) rotate3d(0, 0, 1, 24deg)","translate3d(-79px,44px,0px) rotate3d(0, 0, 1, 25deg)","translate3d(-77px,59px,0px) rotate3d(0, 0, 1, 32deg)","translate3d(-59px,35px,0px) rotate3d(0, 0, 1, 35deg)","translate3d(-45px,48px,0px) rotate3d(0, 0, 1, 35deg)"],height:["63px","73px","73px","83px","93px"],t:0,mr:0,}}/>}>

            <Box
            sx={{display: 'flex', flexWrap: 'wrap', '& :not(style)': {m: 1},mx:"auto",justifyContent:"center",backgroundColor:"#69d2ea",borderRadius:"23px" }}>



            {HomefetchedProductsListNewArrival.map(arg =>
                    {

                        
                    
                        //console.log("args  in the main list are ===>",tTipTitle)
                        return(

                            <Badge sx={{m:"6px !important"}}  anchorOrigin={{vertical: 'bottom',horizontal: 'right',}} badgeContent={<Tooltip disabled={arg.quantity <= 0}  onClick={()=> { return HandleAddToCart(arg), setDrawerActiveState(!drawerActiveState), dispatch({type: "SET_DRAWER", payload: true,});} } title={tTipTitle.slug?.includes(arg.slug)? tTipTitle.msg :"Add to Shopping Cart"} placement="top"><Fab  size="medium" variant="extended" color="primary" aria-label="add" sx={{m:"0 !important",p:"0 !important", transform:"translate3d(-51px,6px,0)",textTransform:"none"}}><AddShoppingCartSharpIcon   /> <Typography sx={{ml:"-5px !important",p:0,fontFamily:"ui-monospace"}}> Add to Cart </Typography> </Fab></Tooltip>} >

                                <Paper elevation={0} sx={{height:311,m:{xs:"1.5 !important", sm:"1.5 !important", md:"1.5 !important",lg:"1.5 !important",xl:"1.5 !important"},mt:"23px !important",p:"0px",":hover": {boxShadow: 6,},borderRadius:"104px"}}>
                                        <Card sx={{height:208,width:205,p:"20px",m:"0 !important",borderTopRightRadius:"100px",borderTopLeftRadius:"15px"}}>


                                            <Chip  label={`${arg.category.name}`} size="small" color="warning" variant="outlined" sx={{ml:"-15px !important", mt:"-17px !important"}} />
                                            
                                            
                                            <Link to={`/product/${arg.slug}`} style={{textDecoration:"none",marginLeft:"1px",marginRight:"1px"}}>
                                            <CardMedia
                                            component="img"
                                            image={arg.images[0].url}
                                            alt={arg.images[0].public_id}
                                            sx={{pt:"5%",t:0,my:"auto"}}
                                            />  
                                            </Link>
                                    
                                                                            
                                        </Card>

                                        <Card sx={{height:140,width:205,p:"0px !important",m:"0 !important"}}>

                                                <CardContent sx={{p:"0px !important",m:"0 !important"}}>
                                                    <Typography variant="caption" color="text.secondary" sx={{display:"-webkit-box",letterSpacing: 0,fontWeight: '600',fontFamily:"system-ui",lineHeight: '-10px important',fontSize:"13.1px",p:"0px !important",mb:"0 !important",mt:"0 !important",ml:"0.1 !important",mr:"0.1 !important"}}>
                                                    { <Link to={`/product/${arg.slug}`} style={{textDecoration:"none",marginLeft:"1px",marginRight:"1px"}}>{arg.title.slice(0,50)}..</Link>} 
                                                    </Typography>
                                                </CardContent>

                                                <CardContent sx={{p:"0px !important",m:"0 !important"}}>
                                                    <Typography variant="caption" color="text.secondary" sx={{transform:"translate3d(48px,-1px ,10px)",p:"0px !important",mr:"0 !important",mt:"0 !important",mb:"0 !important",display:"-webkit-box",fontFamily:"monospace !important",letterSpacing: 0,fontWeight: 600,color:"#1d252c",lineHeight: '29px important',fontSize:"28px"}}>
                                                    {`$${arg.price}`}
                                                    </Typography>
                                                </CardContent>


                                                <CardActions disableSpacing sx={{display:"grid",gridTemplateColumns: 'repeat(3, 1fr)',m:"0 !important",p:"0 !important",}}>
                                                    <IconButton aria-label="add to favorites" sx={{m:"0 !important",p:"0 !important",":hover": {"& svg ":{borderStyle:"double"}}}}>
                                                        <FavoriteIcon  onClick={()=>{HandleAddToWishList(arg._id,arg.title)}} sx={{transform:"translate3d(3px,-4px ,10px)",color:"red",p:"0 !important",borderRadius:"50%",scale:"1.4 !important",}} />
                                                    </IconButton>
                                                        {/* ":hover": {borderStyle:"double"},  */}
                                                </CardActions>
                                        </Card>


                                </Paper>

                            </Badge>
                        )
                    })}


            
            
        
            </Box>
            </Badge>
                    <Box sx={{mx:"auto !important", display:"grid", alignContent:"center", justifyContent:"center",m:2,p:2}}>
                        <Pagination count={Math.ceil(fetchedTotalNumberforProducts / ProductPerPage)} page={page} onChange={handleChange}  />
                    </Box>

            </Container>




                
            
            {/*------------------------ Snackbar ------------------------*/}
        <Snackbar open={SnackbarOpen} autoHideDuration={10000} onClose={()=>{setSnackbarOpen(!SnackbarOpen)}}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} TransitionComponent={TransitionDown}>
            <Alert onClose={()=>{setSnackbarOpen(!SnackbarOpen)}} severity="success" sx={{ width: '100%' }}>
                {snackBarMessage}
            </Alert>
        </Snackbar>



         <Snackbar open={error} autoHideDuration={10000} onClose={()=>{setError(false)}}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} TransitionComponent={TransitionDown}>

            <Alert onClose={()=>{setError(false)}} severity="error" sx={{ width: '100%' }}>
                {`${errorMessage}`}
            </Alert>

         </Snackbar>






            {/* {xs:"40px !important", sm: "240px !improtant", md: "240px !improtant", lg: "240px !improtant", xl: "240px !improtant",} */}


            {/* Show this drawer when new items added to shopping cart */}

            <CartDrawer />
                 


        </>


       ) 
    }
        </>
    )
}

export default NewArrivals
