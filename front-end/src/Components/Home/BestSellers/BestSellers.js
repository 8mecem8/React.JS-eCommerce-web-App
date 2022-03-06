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






import { getProductsByOrder,getTotalNumberProducts } from '../../../UtiFunctions/utiProduct';
import PageLoader from '../../../UtiComponents/page-loader/index'
import { AverageRatingView } from '../../Product/RatingsView/RatingsView';
import { MainRatingView } from '../../Product/RatingsView/MainRatingView';
import CartDrawer from '../../../UtiComponents/cartDrawer/cartDrawer';




import promoback from './prm2.png';
import funcad from './fad.JPG';



function BestSellers() {


    const dispatch = useDispatch()
    let {user,cart} = useSelector(state => ({...state}))

    const ProductPerPage = 5
    
    {/*------------------------ Function's main state ------------------------*/}
    const [HomefetchedProductsListBestSellers, setHomeFetchedProductsListBestSellers] = useState([]);
    const [fetchedTotalNumberforProducts, setfetchedTotalNumberforProducts] = useState(0);


    {/*------------------------ Pagination State ------------------------*/}
    const [page, setPage] = useState(1);



    {/*------------------------ Function's main Loading state ------------------------*/}

    const [enterPageLoading, setEnterPageLoading] = useState(false);

    {/*------------------------ Fetch All Products as Component Started ------------------------*/}
    useEffect( async()=>
    {
        


        setEnterPageLoading(true)


        await getTotalNumberProducts() 
                .then((arg)=>{setfetchedTotalNumberforProducts(arg.data)})
                .catch((err)=>{console.log("error in getting all products",err)})

            if (page > 2){setPage(2)}

         await  getProductsByOrder("sold", "desc", page, ProductPerPage)
                .then((arg)=>{setHomeFetchedProductsListBestSellers(arg.data)})
                .catch((err)=>{console.log("error in getting all products",err)})


            await new Promise((resolve) => setTimeout(resolve, 100));
        setEnterPageLoading(false)
    },[page])


    

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




console.log()

    return (
        <>
            

            {enterPageLoading ? (<PageLoader />)  : 
        (

            <Container maxWidth="xl" sx={{mx: "auto",pt:2,pl:"6px !important",pr:"22px !important"}}>

            <p>Best Sellers</p>

            <Box
            sx={{backgroundImage:`url(${promoback})`,backgroundRepeat:"repeat",backfaceVisibility:"luminosity",backgroundSize:"contain",display: 'flex', flexWrap: 'wrap', '& :not(style)': {m: 1},mx:"auto", justifyContent:"center" ,backgroundColor:"#ff4913",borderRadius:"23px" }}>
                
            

            {HomefetchedProductsListBestSellers.map(arg =>
                    {
                        //console.log("arg",arg.quantity)
                        
                        return(
                            
                            <Badge  anchorOrigin={{vertical: 'bottom',horizontal: 'right',}} badgeContent={<Tooltip disabled={arg.quantity <= 0} onClick={()=> { return HandleAddToCart(arg), dispatch({type: "SET_DRAWER", payload: true,})} } title="Add to Shopping Cart" placement="top"><Fab size="small" color="primary" aria-label="add" sx={{m:"0 !important",p:"0 !important", fontSize:"5px !important",transform:"translate3d(-29px,-28px,0)"}}><AddShoppingCartSharpIcon /></Fab></Tooltip>} >
                                
                                <Paper elevation={0} sx={{height:311,minWidth:228,m:"1.5 !important",mt:{xs:"52px !important", sm:"64px !important", md:"58px !important",lg:"54px !important",xl:"23px !important"},p:"0px",":hover": {boxShadow: 6,},borderTopRightRadius:"100px",borderTopLeftRadius:"15px",borderBottomRightRadius:"100px",borderBottomLeftRadius:"100px"}}>

                                        <Link to={`/product/${arg.slug}`} style={{textDecoration:"none",marginLeft:"1px",marginRight:"1px"}}>
                                        <Card sx={{height:208,width:250,p:"20px",m:"0 !important",borderTopRightRadius:"100px",borderTopLeftRadius:"15px"}}>
                                                <Chip  label={`${arg.category.name}`} size="small" color="warning" variant="outlined" sx={{ml:"-15px !important", mt:"-17px !important"}} />
                                                
                                                <CardMedia
                                                component="img"
                                                image={arg.images[0].url}
                                                alt={arg.images[0].public_id}
                                                sx={{pt:"5%",t:0,my:"auto"}}
                                                />
                                        
                                        </Card>

                                        <Card sx={{height:140,width:250,p:"0px !important",m:"0 !important",borderBottomLeftRadius:"100px"}}>

                                                <CardContent sx={{p:"0px !important",m:"0 !important"}}>
                                                    <Typography variant="caption" color="text.secondary" sx={{display:"-webkit-box",letterSpacing: 0,fontWeight: '700',lineHeight: '-10px important',fontFamily:"system-ui",fontSize:"12px",p:"0px !important",mb:"0 !important",mt:"2 !important",ml:"0.1 !important",mr:"0.1 !important"}}>
                                                    { <Link to={`/product/${arg.slug}`} style={{textDecoration:"none",marginLeft:"1px",marginRight:"1px"}}>{arg.title.slice(0,62)}..</Link>} 
                                                    </Typography>
                                                </CardContent>

                                                <CardContent sx={{p:"0px !important",m:"0 !important"}}>
                                                    <Typography variant="caption" color="text.secondary" sx={{transform:"translate3d(48px,-22px,0)",fontFamily:"fantasy",p:"0px !important",mr:"0 !important",mt:"3 !important",mb:"0 !important",display:"-webkit-box",letterSpacing: 0,fontWeight: 500,color:"#1d252c",lineHeight: '29px important',fontSize:"52px"}}>
                                                    {`$${arg.price}`}
                                                    </Typography>
                                                    
                                                </CardContent>

                                                
                                                    

                                                <CardActions disableSpacing sx={{display:"grid",gridTemplateColumns: 'repeat(3, 1fr)',m:"0 !important",p:"0 !important"}}>
                                                    <IconButton aria-label="rating" sx={{m:"0 !important",p:"0 !important",transform:"translate3d(92px,-53px,0)"}}>
                                                        <MainRatingView p={arg} />
                                                    </IconButton>
                                                    
                                                </CardActions>
                                        </Card>
                                        </Link>
                                
                                </Paper>

                            </Badge>
                        )
                    })}


            
            
        
            </Box>

                        <Box sx={{mx:"auto !important", display:"grid", alignContent:"center", justifyContent:"center",m:2,p:2,mt:"45px !important"}}>
                            <Pagination count={Math.ceil(fetchedTotalNumberforProducts / ProductPerPage)} page={page} onChange={handleChange}  />
                        </Box>


                        <Box sx={{ bgcolor: '#ffffff00', height: '50px', width:"100vw",mx:"auto",overflowX:"hidden" }} />

                        <CardMedia  component="img" image={funcad} alt="profile picture"
                         sx={{height:["63px","73px","73px","83px","93px"],t:0,mx:"auto !important",my:5,maxWidth:"1000px !important"}}/>

            </Container>



            



        )}

            {/* Show this drawer when new items added to shopping cart */}
            <CartDrawer />


        </>
    )
}

export default BestSellers
