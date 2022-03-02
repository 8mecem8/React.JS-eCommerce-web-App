import React,{useState,useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux";
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
import NewArrivals from './NewArrivals/NewArrivals';
import BestSellers from './BestSellers/BestSellers';
import AllProductsHome from './AllProductsHome/AllProductsHome';








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
    const dispatch = useDispatch();

   

{/*------------------------ İf there is logged user ------------------------*/}
    const user = useSelector(state => state.user)

{/*------------------------ Function's main state ------------------------*/}
    
    


{/*------------------------ Function's main Loading state ------------------------*/}

    const [enterPageLoading, setEnterPageLoading] = useState(false);


{/*------------------------ Fetch All Products as Component Started ------------------------*/}

    useEffect( async()=>
    {
        //When there is a new render Set page position to 0 at Y axis
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;

        dispatch({
            type: "SEARCH_QUERY",
            payload: { text: "" },
            })

        setEnterPageLoading(true)
       
        await new Promise((resolve) => setTimeout(resolve, 100));


        setEnterPageLoading(false)
    },[])



    




    return (
        <>
        {enterPageLoading ? (<PageLoader />)  : 
        (
        <section style={{backgroundColor:"#f6f9fc",width:"100vw",height:"100%",overflowY:"hidden",overflowX:"hidden",marginTop:"0px"}}>


        { /*------------------------ Top Product list Carousel ------------------------*/ }
             {/* <Container maxWidth="lg" sx={{mx: "auto",pt:2}}>
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

                {["zurna", "kurna", "burma"].map(arg =>
                    {
                    

                        return(
                            arg
                        )
                    })}
              

                </Carousel>
            </Container> */}
            


            <NewArrivals />

            <BestSellers />
           
            <AllProductsHome />

     

            
                        <Box sx={{ bgcolor: '#0d6ee108', height: '30px', width:"100vw",overflowX:"hidden" }} />

        </section>
        
        )}
        <Footer/>
        </>
    )
}

export default Home
