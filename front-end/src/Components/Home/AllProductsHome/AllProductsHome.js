import React,{useState,useEffect} from 'react'
import  {Link} from "react-router-dom";
import { useDispatch,useSelector } from 'react-redux';
import _ from "lodash";

// Material UI
import { CircularProgress} from '@mui/material';
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
import Fab from '@mui/material/Fab';
import AddShoppingCartSharpIcon from '@mui/icons-material/AddShoppingCartSharp';
import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';
import Pagination from '@mui/material/Pagination';
import Drawer from '@mui/material/Drawer';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';





import { getProductsByOrder,getTotalNumberProducts } from '../../../UtiFunctions/utiProduct';
import PageLoader from '../../../UtiComponents/page-loader/index'
import { AverageRatingView } from '../../Product/RatingsView/RatingsView';
import { MainRatingView } from '../../Product/RatingsView/MainRatingView';
import CartDrawer from '../../../UtiComponents/cartDrawer/cartDrawer';
import { addToWishlist } from '../../../UtiFunctions/utiUSer';






{/*------------------------ Snackbar color setting ------------------------*/}
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

{/*------------------------ Snackbar slide effect ------------------------*/}
function TransitionDown(props) {
  return <Slide {...props} direction="down" />;
}







function AllProductsHome() {


    const dispatch = useDispatch()
    let {user,cart} = useSelector(state => ({...state}))

    
    {/*------------------------ Function's main state ------------------------*/}
    const [fetchedAllProductsHome, setFetchedAllProductsHome] = useState([]);




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


         await  getProductsByOrder("quantity", "desc", 0, 50)
                .then((arg)=>{setFetchedAllProductsHome(arg.data)})
                .catch((err)=>{console.log("error in getting all products",err)})


            await new Promise((resolve) => setTimeout(resolve, 100));
        setEnterPageLoading(false)
    },[])


    

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




console.log()

    return (
        <>
            

            {enterPageLoading ? (<PageLoader />)  : 
        (

            <Container maxWidth="xl" sx={{mx: "auto",pt:2}}>

           

            <Box
            sx={{display: 'flex', flexWrap: 'wrap', '& :not(style)': {m: 1},mx:"auto",justifyContent:"center" }}>
                
            

            {fetchedAllProductsHome.map(arg =>
                    {
                        //console.log("arg",arg.quantity)
                        
                        return(
                            
                            <Badge sx={{m:"5px !important"}} anchorOrigin={{vertical: 'bottom',horizontal: 'right',}} badgeContent={<Tooltip disabled={arg.quantity <= 0} onClick={()=> { return HandleAddToCart(arg), dispatch({type: "SET_DRAWER", payload: true,})} } title="Add to Shopping Cart" placement="top"><Fab size="small" color="primary" aria-label="add" sx={{m:"0 !important",p:"0 !important", fontSize:"5px !important",transform:"translate3d(-30px,-46px,0)"}}><AddShoppingCartSharpIcon /></Fab></Tooltip>} >
                            <Badge sx={{m:"0px !important"}} anchorOrigin={{vertical: 'bottom',horizontal: 'right',}} badgeContent={<Tooltip  onClick={()=> {HandleAddToWishList(arg._id,arg.title)} } title="Add to WishList" placement="top"><Fab size="small" aria-label="add" sx={{backgroundColor:"white",color:"red",m:"0 !important",p:"0 !important", fontSize:"5px !important",transform:"translate3d(-170px,-193px,0)"}}><FavoriteIcon /></Fab></Tooltip>} >
                            



                                <Paper elevation={0} sx={{m:"3px !important",p:"0px",borderTopRightRadius:"143px !important",borderTopLeftRadius:"55px !important",borderBottomRightRadius:"34px !important",borderBottomLeftRadius:"34px !important",":hover": {boxShadow: 6,},backgroundColor:"rgb(246 249 252)",borderRadius:"70%"}}>


                                        <Card sx={{height:175,width:182,p:"36px",m:"0 !important",borderTop:"solid",borderColor:"deepskyblue",borderBottomRightRadius:"0px !important",borderBottomLeftRadius:"0px !important",borderTopRightRadius:"143px !important",borderTopLeftRadius:"55px !important"}}>
                                                <Chip  label={`${arg.category.name}`} size="small" color="warning" variant="outlined" sx={{ml:"-15px !important", mt:"-17px !important"}} />
                                                
                                                <CardMedia
                                                component="img"
                                                image={arg.images[0].url}
                                                alt={arg.images[0].public_id}
                                                sx={{pt:"5%",t:0,my:"auto"}}
                                                />
                                        
                                        </Card>

                                        <Card sx={{height:140,width:182,p:"0px !important",m:"0 !important",borderTopRightRadius:"0px !important", borderTopLeftRadius:"0px !important",borderBottomRightRadius:"34px !important",borderBottomLeftRadius:"34px !important"}}>

                                                <CardContent sx={{p:"0px !important",m:"0 !important"}}>
                                                    <Typography variant="caption" color="text.secondary" sx={{display:"-webkit-box",letterSpacing: 0,fontWeight: 'light',lineHeight: '-10px important',fontSize:"12px",p:"0px !important",mb:"0 !important",mt:"2 !important",ml:"0.1 !important",mr:"0.1 !important"}}>
                                                    { <Link to={`/product/${arg.slug}`} style={{textDecoration:"none",marginLeft:"1px",marginRight:"1px"}}>{arg.title.slice(0,62)}..</Link>} 
                                                    </Typography>
                                                </CardContent>

                                                <CardContent sx={{p:"0px !important",m:"0 !important"}}>
                                                    <Typography variant="caption" color="text.secondary" sx={{transform:"translate3d(8px,-16px,0)",p:"0px !important",mr:"0 !important",mt:"3 !important",mb:"0 !important",display:"-webkit-box",fontFamily:"system-ui",letterSpacing: 0,fontWeight: 100,color:"#1d252c",lineHeight: '29px important',fontSize:"32px"}}>
                                                    {`$${arg.price}`}
                                                    </Typography>
                                                    
                                                </CardContent>

                                                
                                                    

                                                <CardActions disableSpacing sx={{display:"grid",gridTemplateColumns: 'repeat(3, 1fr)',m:"0 !important",p:"0 !important"}}>
                                                    <IconButton aria-label="rating" sx={{m:"0 !important",p:"0 !important",transform:"translate3d(8px,-42px,0)"}}>    
                                                        <MainRatingView p={arg} />
                                                    </IconButton>
                                                    
                                                </CardActions>
                                        </Card>

                                
                                </Paper>

                            </Badge>
                            </Badge>
                        )
                    })}


            
            
        
            </Box>

                   


                        <Box sx={{ bgcolor: '#ffffff00', height: '50px', width:"100vw",mx:"auto",overflowX:"hidden" }} />

            </Container>



            


        )}



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







            {/* Show this drawer when new items added to shopping cart */}
            <CartDrawer />


        </>
    )
}

export default AllProductsHome
