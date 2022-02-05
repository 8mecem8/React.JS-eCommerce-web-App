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
import Drawer from '@mui/material/Drawer';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Grid from '@mui/material/Grid';
import SentimentVerySatisfiedOutlinedIcon from '@mui/icons-material/SentimentVerySatisfiedOutlined';
import ForwardOutlinedIcon from '@mui/icons-material/ForwardOutlined';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Fab from '@mui/material/Fab';
import AddShoppingCartSharpIcon from '@mui/icons-material/AddShoppingCartSharp';
import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';
import Pagination from '@mui/material/Pagination';
import Divider from '@mui/material/Divider';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';



import './NewArrivals.css'


import { getProductsByOrder,getTotalNumberProducts } from '../../../UtiFunctions/utiProduct';
import PageLoader from '../../../UtiComponents/page-loader/index'






function NewArrivals() {

    const dispatch = useDispatch()
    const navigate = useNavigate();
    const {user,cart} = useSelector(state => ({...state}))



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

    {/*------------------------ Fetch All Products as Component Started ------------------------*/}
    useEffect( async()=>
    {
        setEnterPageLoading(true)

        setTTipTitle([])

        await getTotalNumberProducts() 
                .then((arg)=>{setfetchedTotalNumberforProducts(arg.data)})
                .catch((err)=>{console.log("error in getting all products",err)})



        await  getProductsByOrder("createdAt", "desc", page)
                .then((arg)=>{setHomeFetchedProductsListNewArrival(arg.data)})
                .catch((err)=>{console.log("error in getting all products",err)})


            await new Promise((resolve) => setTimeout(resolve, 1000));
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







    return (
        <>
    {     enterPageLoading ? (<PageLoader />)  : 
      (      
          
        <>
          
          <Container maxWidth="xl" sx={{mx: "auto",pt:2}}>

            <p>New arrivals</p>

            <Box
            sx={{display: 'flex', flexWrap: 'wrap', '& :not(style)': {m: 1},mx:"auto" }}>



            {HomefetchedProductsListNewArrival.map(arg =>
                    {
                    
                        console.log("args  in the main list are ===>",tTipTitle)
                        return(

                            <Badge  anchorOrigin={{vertical: 'bottom',horizontal: 'right',}} badgeContent={<Tooltip onClick={()=> { return HandleAddToCart(arg), setDrawerActiveState(true)} } title={tTipTitle.slug.includes(arg.slug)? tTipTitle.msg :"Add to Shopping Cart"} placement="top"><Fab size="small" color="primary" aria-label="add" sx={{m:"0 !important",p:"0 !important", fontSize:"5px !important",transform:"translate3d(-29px,-18px,0)"}}><AddShoppingCartSharpIcon  /></Fab></Tooltip>} >

                                <Paper elevation={0} sx={{height:328,m:"1.5 !important",p:"0px",":hover": {boxShadow: 6,},}}>
                                <Card sx={{height:208,width:205,p:"20px",m:"0 !important"}}>
                                <Chip  label={`${arg.category.name}`} size="small" color="warning" variant="outlined" sx={{ml:"-15px !important", mt:"-17px !important"}} />
                                <CardMedia
                                component="img"
                                image={arg.images[0].url}
                                alt={arg.images[0].public_id}
                                sx={{pt:"5%",t:0,my:"auto"}}
                                />  
                               
                                
                                
                                </Card>

                                <Card sx={{height:140,width:205,p:"0px !important",m:"0 !important"}}>

                                        <CardContent sx={{p:"0px !important",m:"0 !important"}}>
                                            <Typography variant="caption" color="text.secondary" sx={{display:"-webkit-box",letterSpacing: 0,fontWeight: 'light',lineHeight: '-10px important',fontSize:"12px",p:"0px !important",mb:"0 !important",mt:"0 !important",ml:"0.1 !important",mr:"0.1 !important"}}>
                                            { <Link to={`/product/${arg.slug}`} style={{textDecoration:"none",marginLeft:"1px",marginRight:"1px"}}>{arg.title.slice(0,50)}..</Link>} 
                                            </Typography>
                                        </CardContent>

                                        <CardContent sx={{p:"0px !important",m:"0 !important"}}>
                                            <Typography variant="caption" color="text.secondary" sx={{p:"0px !important",mr:"0 !important",mt:"0 !important",mb:"0 !important",display:"-webkit-box",fontFamily:"Helvetica",letterSpacing: 0,fontWeight: 600,color:"#1d252c",lineHeight: '29px important',fontSize:"25px"}}>
                                            {`$${arg.price}`}
                                            </Typography>
                                        </CardContent>


                                        <CardActions disableSpacing sx={{display:"grid",gridTemplateColumns: 'repeat(3, 1fr)',m:"0 !important",p:"0 !important"}}>
                                            <IconButton aria-label="add to favorites" sx={{m:"0 !important",p:"0 !important"}}>
                                            <FavoriteIcon sx={{color:"red",p:"0 !important"}} />
                                            </IconButton>
                     
                                        </CardActions>
                                </Card>


                                </Paper>

                            </Badge>
                        )
                    })}


            
            
        
            </Box>

                    <Box sx={{mx:"auto !important", display:"grid", alignContent:"center", justifyContent:"center",m:2,p:2}}>
                        <Pagination count={Math.round(fetchedTotalNumberforProducts / 3)} page={page} onChange={handleChange}  />
                    </Box>

            </Container>



            


            {/* Show this drawer when new items added to shopping cart */}
            <Drawer anchor={"right"} open={drawerActiveState} onClose={()=>setDrawerActiveState(false)} onClick={()=>setDrawerActiveState(false)} sx={{bgcolor:"rgba(0, 0, 0, 0.5) !important",}} >
                <Grid container direction="row" justifyContent="center" justifyItems="space-around" alignItems={"center"}>

                    <Grid item xs={12} sm={12} md={12} lg={7} xl={7} sx={{m:"0px !important",p:"0px !important",display:"grid",justifyContent:"center"}}>
                        <Typography component="fieldset" sx={{pl:1,m:"0px !important",pb:"0px !important",pt:"0px !important",pr:"0px !important",border: 0,boxShadow: 0,}} variant="body1" fontWeight={700} fontSize="1.4rem">Items in your cart</Typography> 
                    </Grid>

                    <Grid item xs={12} sm={12} md={12} lg={4} xl={4} sx={{display:"contents",alignItems:"center"}}>
                        <Button sx={{mr:"0px !important",width:"240px !important",height:"50px !important",bgcolor:"#ffe000",color:"#040c13",'&:hover': {backgroundColor: '#ffe94d',},}}
                            size="medium"   variant="contained" onClick={()=>{navigate("/cart")}}
                        >Go to your Cart</Button>
                    </Grid>

                </Grid>

                    <Divider />



                                    <ImageList sx={{ width: "100%", height:"100%" }}>



                                    

                     {cart.map((arg,i)=>
                                {
                                    
                                    return <> 
                                    
                                             <ImageListItem key={i} cols={window.innerWidth <= 978 ? 2 :1} rows={2} sx={{scale:"0.85",width:"100%"}}>
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
                                    
                                    
                                    
                                    
                                    {/* <Grid id={"cartDrawer"} item sx={{mt:5,mb:1,ml:2}}>
                                                <Grid container direction={{
                                                        xs: "row", 
                                                        sm: "row", 
                                                        md: "row", 
                                                        lg: "row", 
                                                        xl: "row",}} spacing={1} sx={{m:"0 !important",p:"0 !important",maxHeight:"60%"}}>

                                                    <Grid item xs={12} sm={8} md={10} lg={10} xl={10} sx={{m:"0px !important",p:"0px !important"}}>

                                                            <Grid container direction="row" spacing={1} sx={{maxHeight:"60%"}}>

                                                                <Grid item xs={6} sm={3} md={3} lg={3} xl={3} sx={{m:{xs:"0px !important", sm:"0", md:"0",lg:"0px !important",xl:"0px !important"},mt:{xs:"0px !important", sm:"-49px !important", md:"-40px !important",lg:"-40px !important",xl:"0px !important"},height:"84px",width:250,p:"0 !important",}}>

                                                                    <CardMedia
                                                                        component="img"
                                                                        height="110"
                                                                        image={arg.images[0].url}
                                                                        alt="image"
                                                                        sx={{p:0,t:0,my:"auto",objectFit:"contain !important"}}
                                                                    />

                                                                </Grid>

                                                                <Grid item xs={6} sm={8} md={6} lg={6} xl={7} sx={{m:"0px !important",p:"0 !important",}}>
                                                                    <Typography component="div" gutterBottom variant="body1" s color="#3d4e5a" fontSize={{xs:"0.74em", sm:"0.6em", md:"0.8em",lg:"0.8em",xl:"0.8em"}} letterSpacing={{xs:"0.000068em", sm:"0.000028em", md:"0.068em",lg:"0.068em",xl:"0.068em"}}>{<Link target="_blank" to={`/product/${arg.slug}`} style={{textDecoration:"none",marginLeft:"1px",marginRight:"1px"}}>{arg.title.slice(0,20)}..</Link>}</Typography>
                                                                </Grid>

                                                                                             
                                                        
                                                        
                                                            </Grid>
                                                    </Grid>


                                                </Grid>
                                                
                                            </Grid> */}
                                            

                                            
                                            </> 

                                })}
                                </ImageList>
            </Drawer>



                    


        </>


       ) 
    }
        </>
    )
}

export default NewArrivals
