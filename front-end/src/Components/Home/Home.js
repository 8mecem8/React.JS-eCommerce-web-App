import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux';
import { getAllProductsByCounts,getProductsByOrder } from '../../UtiFunctions/utiProduct'
import  {Link} from "react-router-dom";


//Carousel
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';


// Material UI
import { CircularProgress} from '@mui/material';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import Fab from '@mui/material/Fab';
import AddShoppingCartSharpIcon from '@mui/icons-material/AddShoppingCartSharp';
import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';


/* Custom Css */
import useStyles from './HomeStyles'
import BarLoader from '../BarLoader/BarLoader';
import DOubbleBubble from '../DoubleBubble/DoubleBubble';


import PageLoader from '../../UtiComponents/page-loader/index'
import Footer from '../Footer/Footer';








/*------------------------ Carousel Settings Prop ------------------------*/

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 2 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 650, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};









function Home()
{
    const sty = useStyles()


   

{/*------------------------ İf there is logged user ------------------------*/}
    const user = useSelector(state => state.user)

{/*------------------------ Function's main state ------------------------*/}
    const [HomefetchedProductsList, setHomeFetchedProductsList] = useState([]);

{/*------------------------ Function's main Loading state ------------------------*/}

    const [enterPageLoading, setEnterPageLoading] = useState(false);


{/*------------------------ Fetch All Products as Component Started ------------------------*/}

    useEffect( async()=>
    {
        setEnterPageLoading(true)

      //Get products in 100 list 
    //   await getAllProductsByCounts(100)
    //         .then((arg)=>{setHomeFetchedProductsList(arg.data)})
    //         .catch((err)=>{console.log("error in getting all products",err)})

          await  getProductsByOrder("createdAt", "desc", 100)
                .then((arg)=>{setHomeFetchedProductsList(arg.data)})
                .catch((err)=>{console.log("error in getting all products",err)})

            await new Promise((resolve) => setTimeout(resolve, 1000));
        setEnterPageLoading(false)
    },[])



    console.log(HomefetchedProductsList)




    return (
        <>
        {enterPageLoading ? (<PageLoader />)  : 
        (
        <section style={{backgroundColor:"#f6f9fc",width:"100vw",height:"100%",overflowY:"hidden",overflowX:"hidden"}}>


        { /*------------------------ Top Product list Carousel ------------------------*/ }
             <Container maxWidth="lg" sx={{mx: "auto",pt:2}}>
                <Carousel
                        swipeable={true}
                        draggable={true}
                        showDots={true}
                        responsive={responsive}
                        ssr={false} // means to render carousel on server-side.
                        infinite={true}
                        autoPlay={ true}
                        autoPlaySpeed={3000}
                        keyBoardControl={true}
                        customTransition="all .5"
                        transitionDuration={3000}
                        containerClass="carousel-container"
                        removeArrowOnDeviceType={["tablet", "mobile"]}
                        
                        dotListClass="custom-dot-list-style"
                        itemClass="carousel-item-padding-40-px"
                >

                {HomefetchedProductsList.map(arg =>
                    {
                    

                        return(
                            <img src={arg.images[0].url} width="500" height="300"  />
                        )
                    })}
              

                </Carousel>
            </Container>
            
            <Container maxWidth="xl" sx={{mx: "auto",pt:2}}>

            <p>New arrivals</p>


             








            <Box
            sx={{display: 'flex', flexWrap: 'wrap', '& :not(style)': {m: 1},mx:"auto" }}>



            {HomefetchedProductsList.map(arg =>
                    {
                    
                        console.log("args  in the main list are ===>",arg)
                        return(

                            <Badge  anchorOrigin={{vertical: 'bottom',horizontal: 'right',}} badgeContent={<Tooltip title="Add to Shopping Cart" placement="top"><Fab size="small" color="primary" aria-label="add" sx={{m:"0 !important",p:"0 !important", fontSize:"5px !important",transform:"translate3d(-29px,-18px,0)"}}><AddShoppingCartSharpIcon /></Fab></Tooltip>} >

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
                                            { <Link to={`/product/${arg.slug}`} style={{textDecoration:"none",marginLeft:"1px",marginRight:"1px"}}>{arg.title.slice(0,56)}..</Link>} 
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

            </Container>


            <Container maxWidth="xl" sx={{mx: "auto",pt:2}}>

            <p>Best Sellers</p>


             








            <Box
            sx={{display: 'flex', flexWrap: 'wrap', '& :not(style)': {m: 1},mx:"auto" }}>



            {HomefetchedProductsList.map(arg =>
                    {
                    
                        console.log("args  in the main list are ===>",arg)
                        return(

                            <Badge  anchorOrigin={{vertical: 'bottom',horizontal: 'right',}} badgeContent={<Tooltip title="Add to Shopping Cart" placement="top"><Fab size="small" color="primary" aria-label="add" sx={{m:"0 !important",p:"0 !important", fontSize:"5px !important",transform:"translate3d(-29px,-18px,0)"}}><AddShoppingCartSharpIcon /></Fab></Tooltip>} >

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
                                            { <Link to={`/product/${arg.slug}`} style={{textDecoration:"none",marginLeft:"1px",marginRight:"1px"}}>{arg.title.slice(0,56)}..</Link>} 
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
            <Box sx={{ bgcolor: '#ffffff00', height: '50px', width:"100vw",mx:"auto",overflowX:"hidden" }} />

            </Container>

            
                    <Box sx={{ bgcolor: '#0d6ee108', height: '30px', width:"100vw",overflowX:"hidden" }} />

        </section>
        
        )}
        <Footer/>
        </>
    )
}

export default Home
