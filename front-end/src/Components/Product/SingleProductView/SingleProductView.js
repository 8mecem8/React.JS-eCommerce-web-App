import React,{useState,useEffect} from 'react'
import  {useParams,useNavigate} from "react-router-dom";
import { getRelated, getSingleProductDetails, starUpdateProduct } from '../../../UtiFunctions/utiProduct';
import { useSelector,useDispatch } from 'react-redux';
import _ from "lodash";




// Material UI
import { CircularProgress} from '@mui/material';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import ThumbsUpDownRoundedIcon from '@mui/icons-material/ThumbsUpDownRounded';
import ShoppingBasketRoundedIcon from '@mui/icons-material/ShoppingBasketRounded';
import StarsRoundedIcon from '@mui/icons-material/StarsRounded';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import Drawer from '@mui/material/Drawer';




//React Responsive Carousel
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';


import PageLoader from '../../.././UtiComponents/page-loader/index'

import useStyles from './SingleProductViewStyles'
import BarLoader from '../../../Components/BarLoader/BarLoader';
import {AverageRatingView} from '../RatingsView/RatingsView';
import Footer from '../../Footer/Footer';
import RelatedProducts from '../../../UtiComponents/RelatedProducts/RelatedProducts';
import CartDrawer from '../../../UtiComponents/cartDrawer/cartDrawer';


const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};


{/*------------------------ Snackbar color setting ------------------------*/}
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

{/*------------------------ Snackbar slide effect ------------------------*/}
function TransitionDown(props) {
  return <Slide {...props} direction="down" />;
}





function SingleProductView() {

    const {slug} = useParams();
    let navigate = useNavigate();
    const sty = useStyles();
    const dispatch = useDispatch()

    

    {/*------------------------ İf there is logged user ------------------------*/}
    let {user,cart} = useSelector(state => ({...state}))

    {/*------------------------ Main state ------------------------*/}
    const [fetchedSingleProductDetails,setFetchedSingleProductDetails] = useState([])
    const [fetchedRelated,setFetchedRelated] = useState([])


    {/*------------------------ Function's main Loading state ------------------------*/}
    const [enterPageLoading, setEnterPageLoading] = useState(false);

    {/*------------------------ Cart Drawer State ------------------------*/}
    const [drawerActiveState, setDrawerActiveState] = useState(false);

    {/*------------------------ Tab component state ------------------------*/}
    const [value, setValue] = useState('1');

    {/*------------------------ Rating function loading state ------------------------*/}
    const [rateLoading, setRateLoading] = useState(false);

    {/*------------------------ Rating Dialog State ------------------------*/}
    const [giveRatingdialogOpen,setGiveRatingdialogOpen] = useState(false)

    {/*------------------------ Rating Star State ------------------------*/}
    const [rateValue, setRAteValue] = useState(2);
    const [rateHover, setRAteHover] = useState(-1);

    {/*------------------------ Snackbar states ------------------------*/}
    const [SnackbarOpen, setSnackbarOpen] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [snackBarMessage, setSnackBarMessage] = useState("");


    {/*------------------------ Fetch Single Product Details ------------------------*/}

    useEffect( async()=>
    {
        let componentMounted = true;

        setEnterPageLoading(true)

        getSingleProductDetails(slug)
                .then((arg)=>{if(componentMounted){
                    setFetchedSingleProductDetails(arg.data)
                    // Fetch the related products
                     getRelated(arg.data._id).then((a)=>{setFetchedRelated(a.data)})
                                             .catch((err)=>{console.log("error in getting related products",err)})
                    
                }})
                .catch((err)=>{console.log("error in getting all products",err)})

                await new Promise((resolve) => setTimeout(resolve, 1000));

        
        setEnterPageLoading(false)

        return () => {componentMounted = false;}

    },[SnackbarOpen])

    {/*------------------------ Tab component Function ------------------------*/}
    const tabhandleChange = (event, newValue) => {
        setValue(newValue);
    };



    {/*------------------------ Give Rating Function ------------------------*/}
    const startHandleFunc = async(event, newValue) => 
    {
        setRateLoading(true)                   
        setRAteValue(newValue);

        await new Promise((resolve) => setTimeout(resolve, 1500));


        starUpdateProduct(user.token,fetchedSingleProductDetails._id,newValue)
            .then((arg)=>
            {
                
            setSnackBarMessage(`Rating for ${fetchedSingleProductDetails.title} is succesfuly sent`)
            setSnackbarOpen(true)
            setRateLoading(false)
            setGiveRatingdialogOpen(false)     
           
            })
            .catch((error)=>
            {
            setErrorMessage(error?.response?.data || error.message)
            setError(true)
            setRateLoading(false)
           
            })



    }

    {/*------------------------If user gave previous rating set it to rating state ------------------------*/}
    useEffect(()=>
    {
            
        if (fetchedSingleProductDetails.ratings && user) {
         let existingRatingObject = fetchedSingleProductDetails.ratings.find(
         (ele) => ele.postedBy.toString() === user._id.toString());
    
        existingRatingObject && setRAteValue(existingRatingObject.star); // current user's star
    }},[fetchedSingleProductDetails,user])



    


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





    return (
        <>
              {enterPageLoading ? (<PageLoader />)  : 
        (

            <>

            
            <Grid container direction="column" spacing={2} sx={{mx:{xs:"0px !important", sm:"0", md:"0",lg:"0px !important",xl:"0px !important"}}}>


                    {/* upside of the screen */}
                    <Grid item xs={12}>
                        


                            <Grid container direction={window.innerWidth < 774 ? "colomn" : "row" } spacing={1}>


                                        {/* leftside of the upper screen */}
                                        <Grid item xs={window.innerWidth < 774 ? 12 : 6 } sx={{m:0,pt:0, width:{xs: 4,sm: 4,md: 5,lg: 5, xl: 5,}}} >


                                            <Carousel showArrows={true} showThumbs={true} autoPlay infiniteLoop emulateTouch={true} >
                                                {fetchedSingleProductDetails?.images?.map(arg =>{return(<div><img key={arg.public_id} src={arg.url} /></div>)})}                                                
                                            </Carousel>






                                            
                                        </Grid>


                                        {/* rightside of the upper screen */}
                                        <Grid item xs={window.innerWidth < 774 ? 12 : 6 } >
                                            

                                            <Grid  container direction="column" justifyContent={"end"} spacing={2} sx={{m:0,p:{xs: 4,sm: 4,md: 5,lg: 5, xl: 5,},pl:"0 !important"}}>
                                                <Grid item xs={6} md={8} >
                                                    <Typography variant="h4" component="h4" >{fetchedSingleProductDetails?.title}</Typography>
                                                </Grid>

                                                <Grid item xs={6} md={8} sx={{ display: 'flex',justifyContent: 'space-between', width:"100%" }}>
                                                  <Typography variant="h6" component="h6" sx={{whiteSpace:"nowrap"}}>Price:</Typography>  <Typography variant="h6" component="h6" sx={{whiteSpace:"nowrap"}}>${fetchedSingleProductDetails?.price}</Typography>
                                                </Grid>

                                                <Grid item xs={6} md={4} sx={{ display: 'flex',justifyContent: 'space-between', width:"100%" }}>
                                                   <Typography variant="h6" component="h6" sx={{whiteSpace:"nowrap"}}>Category:</Typography> <Typography variant="h6" component="h6" sx={{whiteSpace:"nowrap"}}>{fetchedSingleProductDetails?.category?.name}</Typography>
                                                </Grid>

                                                <Grid item xs={6} md={4} sx={{ display: 'flex',justifyContent: 'space-between', width:"100%" }}>
                                                  <Typography variant="h6" component="h6" sx={{whiteSpace:"nowrap"}}>Sub Categories:</Typography> <Typography variant="h6" component="h6" sx={{whiteSpace:"nowrap"}}>{fetchedSingleProductDetails?.subcategory?.map(arg =>{return(<Grid>{arg.name}</Grid>)})}</Typography>
                                                </Grid>
                                                <Grid item xs={6} md={8} sx={{ display: 'flex',justifyContent: 'space-between', width:"100%" }}>
                                                   <Typography variant="h6" component="h6" sx={{whiteSpace:"nowrap"}}>Color:</Typography> <Typography variant="h6" component="h6" sx={{whiteSpace:"nowrap"}}>{fetchedSingleProductDetails?.color}</Typography>
                                                </Grid>
                                                
                                                <Grid item xs={6} md={8} sx={{ display: 'flex',justifyContent: 'space-between', width:"100%" }}>
                                                  <Typography variant="h6" component="h6" sx={{whiteSpace:"nowrap"}}>Shipping:</Typography> <Typography variant="h6" component="h6" sx={{whiteSpace:"nowrap"}}>{fetchedSingleProductDetails?.shipping}</Typography>
                                                </Grid>

                                                <Grid item xs={6} md={8} sx={{ display: 'flex',justifyContent: 'space-between', width:"100%" }}>
                                                   <Typography variant="h6" component="h6" sx={{whiteSpace:"nowrap"}}>Quantity</Typography> <Typography variant="h6" component="h6" sx={{whiteSpace:"nowrap"}}>{fetchedSingleProductDetails?.quantity}</Typography>
                                                </Grid>

                                                <Grid item xs={6} md={8} sx={{ display: 'flex',justifyContent: 'center', width:"100%" }}>
                                                   <Typography variant="h6" component="h6" sx={{whiteSpace:"nowrap"}}><AverageRatingView p={fetchedSingleProductDetails} /></Typography>
                                                </Grid>

                                                <Grid item xs={6} md={8}>
                                                        <Grid container direction="row" spacing={2} sx={{mx:"auto",width:"100%"}}>
                                                                <Grid item xs={4} sx={{textAlign:"center"}} >
                                                                        <Button variant="contained" onClick={()=> { return HandleAddToCart(fetchedSingleProductDetails), setDrawerActiveState(true), dispatch({type: "SET_DRAWER", payload: true,})} } startIcon={<ShoppingBasketRoundedIcon />} sx={{textTransform:"none", backgroundColor:"linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)"}}>
                                                                            Add to Shopping Bag 
                                                                        </Button>
                                                                </Grid>

                                                                <Grid item xs={4} sx={{textAlign:"center"}}>
                                                                         <Button  startIcon={<StarsRoundedIcon />} sx={{textTransform:"none"}}>
                                                                            Add to Wishlist
                                                                        </Button>
                                                                </Grid>
                                                                <Grid item xs={4} sx={{textAlign:"center"}}> 
                                                                        {user === null ? <Button variant="contained" startIcon={<ThumbsUpDownRoundedIcon />} onClick={()=>{ navigate("/login",{state:{from: `/product/${slug}`}})}} sx={{textTransform:"none",textDecoration:"none"}}>
                                                                            Login to Rate Product 
                                                                        </Button>  :
                                                                         <Button variant="contained" startIcon={<ThumbsUpDownRoundedIcon />} onClick={()=>{setGiveRatingdialogOpen(true)}} sx={{textTransform:"none"}}>
                                                                            Rate Product
                                                                        </Button>}
                                                                </Grid>
                                                        </Grid>
                                                </Grid>
                                            </Grid>


                                        </Grid>

                            </Grid>
 



                    </Grid>


                    {/* downside of the screen */}
                    <Grid item xs={12}>


                    <Box sx={{ width: '100%', typography: 'body1',}}>
                    <TabContext value={value}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList onChange={tabhandleChange} aria-label="lab API tabs example">
                            <Tab label="Description" value="1"  sx={{textTransform:"none"}}/>
                            <Tab label="Specifications" value="2"  sx={{textTransform:"none"}}/>
                            <Tab label="Reviews" value="3"  sx={{textTransform:"none"}}/>
                        </TabList>
                        </Box>
                        <TabPanel value="1"><Typography variant="body1" component="body1">{fetchedSingleProductDetails?.description}</Typography></TabPanel>
                        <TabPanel value="2"><Grid container direction="column" alignItems={"start"} justifyContent={"end"} spacing={2} sx={{mx:"auto",m:0,p:2,}}>
                                                
                                                <Grid item xs={6} md={8} sx={{ display: 'flex',justifyContent: 'space-between', width:"70%" }}>
                                                  <Typography variant="body1" component="h6" sx={{whiteSpace:"nowrap"}}>Screen Resolution:</Typography>  <Typography variant="body1" component="h6"sx={{whiteSpace:"nowrap"}}>1920 x 1080 (Full HD)</Typography>
                                                </Grid>

                                                <Grid item xs={6} md={4} sx={{ display: 'flex',justifyContent: 'space-between', width:"70%" }}>
                                                   <Typography variant="body1" component="h6" sx={{whiteSpace:"nowrap"}}>Touch Screen:</Typography> <Typography variant="body1" component="h6" sx={{whiteSpace:"nowrap"}}>No</Typography>
                                                </Grid>

                                                <Grid item xs={6} md={4} sx={{ display: 'flex',justifyContent: 'space-between', width:"70%" }}>
                                                  <Typography variant="body1" component="h6" sx={{whiteSpace:"nowrap"}}>Storage Type:</Typography> <Typography variant="body1" component="h6" sx={{whiteSpace:"nowrap"}}>SSD</Typography>
                                                </Grid>
                                                <Grid item xs={6} md={8} sx={{ display: 'flex',justifyContent: 'space-between', width:"70%" }}>
                                                   <Typography variant="body1" component="h6" sx={{whiteSpace:"nowrap"}}>Graphics:</Typography> <Typography variant="body1" component="h6" sx={{whiteSpace:"nowrap"}}>Other</Typography>
                                                </Grid>
                                                
                                                <Grid item xs={6} md={8} sx={{ display: 'flex',justifyContent: 'space-between', width:"70%" }}>
                                                  <Typography variant="body1" component="h6" sx={{whiteSpace:"nowrap"}}>Battery Type:</Typography> <Typography variant="body1" component="h6" sx={{whiteSpace:"nowrap"}}>Lithium-ion polymer</Typography>
                                                </Grid>

                                                <Grid item xs={6} md={8} sx={{ display: 'flex',justifyContent: 'space-between', width:"70%" }}>
                                                   <Typography variant="body1" component="h6" sx={{whiteSpace:"nowrap"}}>Backlit Keyboard:</Typography> <Typography variant="body1" component="h6" sx={{whiteSpace:"nowrap"}}>Yes</Typography>
                                                </Grid>

                                              
                                            </Grid>
                        </TabPanel>
                        <TabPanel value="3">In this area you can see the reviews from customers</TabPanel>
                    </TabContext>
                    </Box>








                        
                    </Grid>
            </Grid>

            <Divider variant="middle" sx={{mx:12}}/>

            {/* Related Products Component */}
            <RelatedProducts exArg={fetchedRelated}/>


            {/* Footer Component */}
            <Footer/>
 

            {/*------------------------ Give Rating Dialog------------------------*/}

            <Dialog
                    open={giveRatingdialogOpen}
                    onClose={()=>{setGiveRatingdialogOpen(false)}}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    sx={{scale:"1.5",overflow: 'hidden !important'}}
                >

                    <DialogTitle id="alert-dialog-title" sx={{fontWeight:"600",overflow: 'hidden'}}>
                    {`Please Rate The Product`}
                    </DialogTitle>

                    <DialogContent sx={{width:"100%",mx:"auto",ml:(rateLoading ? 10 : 0),overflow: 'hidden'}}>


                       {rateLoading ? (<><BarLoader speed={2}/></>) :   

                        <Rating
                            sx={{fontSize:"4.5rem",overflow: 'hidden'}}
                            name="hover-feedback"
                            value={rateValue}
                            precision={1}
                            onChange={startHandleFunc}
                            onChangeActive={(event, newHover) => {
                            setRAteHover(newHover);
                            }}
                            emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                        />}
                        {rateLoading ? <></>  : rateValue !== null && (<Box sx={{ ml: 2 }}>{labels[rateHover !== -1 ? rateHover : rateValue]}</Box>)}
              
                    </DialogContent>

                    <DialogActions sx={{overflow: 'hidden'}} >
                    <Button onClick={()=>{setGiveRatingdialogOpen(false)}}>Close</Button>
                    
                    
                   
                    
                         
                    
                    </DialogActions>

                    
            </Dialog>


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
        )}
        </>
    )
}

export default SingleProductView
