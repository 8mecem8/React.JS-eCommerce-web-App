import React,{useState,useEffect} from 'react'
import  {useNavigate,Link} from "react-router-dom";
import { useSelector,useDispatch} from 'react-redux';
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
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';






/* Custom Css */
import useStyles from './UserWishListStyles'




import Footer from '../../Footer/Footer';
import { MainRatingView } from '../../Product/RatingsView/MainRatingView';
import CartDrawer from '../../../UtiComponents/cartDrawer/cartDrawer';
import PageLoader from '../../../UtiComponents/page-loader/index'
import { getWishlist, removeWishlist } from '../../../UtiFunctions/utiUSer';






{/*------------------------ Snackbar color setting ------------------------*/}
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

{/*------------------------ Snackbar slide effect ------------------------*/}
function TransitionDown(props) {
  return <Slide {...props} direction="down" />;
}






function UserWishList() {

    const sty = useStyles()
    const navigate = useNavigate();
    const dispatch = useDispatch()

    let {user,cart} = useSelector(state => ({...state}))

    {/*------------------------ Main state ------------------------*/}

    const [fetchedWishListİtems,setFetchedWishListİtems] = useState([])


    {/*------------------------ Function's main Loading state ------------------------*/}

    const [enterPageLoading, setEnterPageLoading] = useState(false);


        {/*------------------------ Snackbar states ------------------------*/}
    const [SnackbarOpen, setSnackbarOpen] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [snackBarMessage, setSnackBarMessage] = useState("");



    {/*------------------------ Fetch Wishlist items as Component Started ------------------------*/}
    useEffect( async()=>
    {
        //When there is a new render Set page position to 0 at Y axis
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;

        setEnterPageLoading(true)


        getWishlist(user.token)
                .then((arg)=>{setFetchedWishListİtems(arg.data)})
                .catch((err)=>{console.log("error in getting all products",err)})



         

            await new Promise((resolve) => setTimeout(resolve, 1000));
        setEnterPageLoading(false)
    },[snackBarMessage])




   





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




    const handleDelete = async(id,title) =>
    {

        await new Promise((resolve) => setTimeout(resolve, 1500));

        removeWishlist(id,user.token)
                .then((arg)=>
            {
                
            setSnackBarMessage(`Product ${title} is succesfuly deleted from your Wishlist`)
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
            
            
            {enterPageLoading ? (<PageLoader />)  : 
        (

            <Container maxWidth="xl" sx={{mx: "auto",pt:2}}>

            <p>{user.name}'s Wishlist</p>

            <Box
            sx={{display: 'flex', flexWrap: 'wrap', '& :not(style)': {m: 1},mx:"auto" }}>
                
            

            {fetchedWishListİtems?.wishlist?.map(arg =>
                    {
                        console.log("arg",arg.title)
                        
                        return(
                            
                            <Badge  anchorOrigin={{vertical: 'top',horizontal: 'left',}} badgeContent={<Tooltip disabled={arg.quantity <= 0} onClick={()=> { return HandleAddToCart(arg), dispatch({type: "SET_DRAWER", payload: true,})} } title="Add to Shopping Cart" placement="top"><Fab size="small" color="primary" aria-label="add" sx={{m:"0 !important",p:"0 !important", fontSize:"5px !important",transform:"translate3d(10px,40px,0)"}}><AddShoppingCartSharpIcon /></Fab></Tooltip>} >
                            <Badge  anchorOrigin={{vertical: 'top',horizontal: 'left',}} badgeContent={<Tooltip  onClick={()=> { handleDelete(arg._id,arg.title) }} title="Delete From Wishlist" placement="bottom"><Fab size="small" aria-label="delete" sx={{backgroundColor:"#f23030 !important",m:"0 !important",p:"0 !important", fontSize:"5px !important",transform:"translate3d(3px,80px,0)"}}><HighlightOffIcon sx={{color:"white"}} /></Fab></Tooltip>} >
                            


                                <Paper elevation={0} sx={{height:450,minWidth:300,m:"1.5 !important",p:"0px",":hover": {boxShadow: 6,},}}>


                                        <Card sx={{height:300,width:300,p:"20px",m:"0 !important"}}>
                                                                
                                                <CardMedia
                                                component="img"
                                                image={arg.images[0].url}
                                                alt={arg.images[0].public_id}
                                                sx={{pt:"5%",t:0,my:"auto"}}
                                                />
                                        
                                        </Card>

                                        <Card sx={{height:140,width:300,p:"0px !important",m:"0 !important"}}>

                                                <CardContent sx={{p:"0px !important",m:"0 !important"}}>
                                                    <Typography variant="caption" color="text.secondary" sx={{display:"-webkit-box",letterSpacing: 0,fontWeight: 'light',lineHeight: '-10px important',fontSize:"12px",p:"0px !important",mb:"0 !important",mt:"2 !important",ml:"0.1 !important",mr:"0.1 !important"}}>
                                                    { <Link to={`/product/${arg.slug}`} style={{textDecoration:"none",marginLeft:"1px",marginRight:"1px"}}>{arg.title}</Link>} 
                                                    </Typography>
                                                </CardContent>

                                                <CardContent sx={{p:"0px !important",m:"0 !important",display:"flex",alignItems:"center", position:"absolute",bottom:"8px"}}>
                                                    
                                                    <IconButton aria-label="rating" sx={{m:"0 !important",p:"0 !important"}}>
                                                    
                                                        <MainRatingView p={arg} />
                                                    </IconButton>

                                                    <Typography variant="caption" color="text.secondary" sx={{transform:"translate3d(0px,-3px,0)",p:"0px !important",mr:"0 !important",mt:"3 !important",mb:"0 !important",display:"-webkit-box",fontFamily:"Helvetica",letterSpacing: 0,fontWeight: 600,color:"#1d252c",lineHeight: '29px important',fontSize:"25px"}}>
                                                    {`$${arg.price}`}
                                                    </Typography>
                                                </CardContent>

                                                
                                                    
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






            {/* Show this drawer when new items added to shopping cart */}
            <CartDrawer />


            {/* Footer Component */}
            <Footer/>





              {/* ------------------------ Snackbar ------------------------ */} 
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

        </>
    )
}

export default UserWishList
