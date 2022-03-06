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





import caro1 from './1a.JPG';
import caro2 from './2a.JPG';
import caro3 from './3a.JPG';
import caro4 from './4a.JPG';
import caro5 from './5a.JPG';
import caro6 from './6a.JPG';
import caro7 from './7a.JPG';

import pad from './pad.JPG';

/*------------------------ Carousel Settings Prop ------------------------*/

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
    partialVisibilityGutter: 0
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
    partialVisibilityGutter: 0
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
    partialVisibilityGutter: 0
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
        <section style={{backgroundColor:"rgb(246 249 252 / 0%)",width:"100vw",height:"100%",overflowY:"hidden",overflowX:"hidden",marginTop:"0px"}}>


        { /*------------------------ Top Product list Carousel ------------------------*/ }
              <Container  sx={{m:"0px !important",p:"0px !important",mx: "auto",pt:2,maxWidth:"100% !important"}}>
                <Carousel
                    swipeable={false}
                    draggable={false}
                    showDots={true}
                    responsive={responsive}
                    ssr={false} // means to render carousel on server-side.
                    infinite={true}
                    autoPlay={true}
                    autoPlaySpeed={4000}
                    keyBoardControl={true}
                    customTransition="all .2"
                    transitionDuration={1000}
                    containerClass="carousel-container"
                    removeArrowOnDeviceType={["tablet", "mobile"]}
                    
                    dotListClass="custom-dot-list-style"
                    itemClass="carousel-item-padding-40-px"
                    >
                        
                        <CardMedia  component="img" image={caro1} alt=" picture" />
                        <CardMedia  component="img" image={caro2} alt=" picture" />
                        <CardMedia  component="img" image={caro3} alt=" picture" />
                        <CardMedia  component="img" image={caro4} alt=" picture" />
                        <CardMedia  component="img" image={caro5} alt=" picture" />
                        <CardMedia  component="img" image={caro6} alt=" picture" />
                        <CardMedia  component="img" image={caro7} alt=" picture" />

                        

                </Carousel>
            </Container> 
            


            <NewArrivals />

            <BestSellers />
           
            <AllProductsHome />

        

     

            
                        <Box sx={{ bgcolor: '#0d6ee108', height: '30px', width:"100vw",overflowX:"hidden" }} />
                         <CardMedia  component="img" image={pad} alt="profile picture"
                         sx={{t:0,mx:"auto !important",my:2,maxWidth:"1659px !important"}}/>

        </section>
        
        )}
        <Footer/>
        </>
    )
}

export default Home
