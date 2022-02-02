import React,{useState,useEffect} from 'react'
import  {Link} from "react-router-dom";
import { useDispatch,useSelector } from 'react-redux';



// Material UI
import { CircularProgress} from '@mui/material';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import SentimentVerySatisfiedOutlinedIcon from '@mui/icons-material/SentimentVerySatisfiedOutlined';
import Typography from '@mui/material/Typography';
import ForwardOutlinedIcon from '@mui/icons-material/ForwardOutlined';




/* Custom Css */
import useStyles from './ShoppingCartStyles'
import PageLoader from '../../UtiComponents/page-loader';
import pic1 from "./a1.png"



//Main import components
import Footer from '../Footer/Footer';



function ShoppingCart() {

    const sty = useStyles()
    const dispatch = useDispatch()


    let {user,cart} = useSelector(state => ({...state}))


    {/*------------------------ Function's main Loading state ------------------------*/}

    const [enterPageLoading, setEnterPageLoading] = useState(false);





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


                (<Grid container direction="row" justifyContent="center" alignItems="center" sx={{mx:"auto"}}>

                    <Grid item xs={8}>

                    <h1>LEFT side</h1>


                    </Grid>




                    <Grid item xs={4}>

                    <h1>RİGHT side</h1>

                        <Grid container direction="column" justifyContent="center" alignItems="start" spacing={2}>

                            <Grid item xs={6} >

                                upside

                            </Grid>


                            <Grid item xs={6}>

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
