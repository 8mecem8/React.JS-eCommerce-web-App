import React,{useState,useEffect} from 'react'
import  {Link,useNavigate} from "react-router-dom";
import { useDispatch,useSelector } from 'react-redux';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";



// Material UI
import { Button, CircularProgress} from '@mui/material';
import { Box } from '@mui/system';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import SentimentVerySatisfiedOutlinedIcon from '@mui/icons-material/SentimentVerySatisfiedOutlined';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';



/* Custom Css */
import useStyles from './PaymentStyles'
import PageLoader from '../../UtiComponents/page-loader';
import pic1 from "./a1.png"
import './StripeOfficial.css'




//Main import components
import Footer from '../Footer/Footer';
import CheckoutForm from './StripeCheckoutForm/CheckoutForm';






const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_SECRET)


function Payment() {

    const sty = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate();

    

    const {user,cart} = useSelector(state => ({...state}))



    {/*------------------------ Function's main Loading state ------------------------*/}

    const [enterPageLoading, setEnterPageLoading] = useState(false);
  

    {/*------------------------ Fetched User Cart state ------------------------*/}

    const [fuc, setFuc] = useState([]);

    useEffect( async ()=>
    {
    setEnterPageLoading(true)
    

    
    
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setEnterPageLoading(false)

    },[user])
    

const appearance = {
    theme: 'stripe',
  };



const options = {
    appearance,
  };






  return (
<>
             
    {    enterPageLoading ? (<PageLoader />)  : 
    
        (

            <>
                    
                    <Card sx={{ maxWidth: 800,mb:5, width: {
                        xs: 400, 
                        sm: 600, 
                        md: 700, 
                        lg: 700, 
                        xl: 800, 
                        }, }} className={sty.container}>

                            <CardMedia component="img" image={pic1} alt="Register"/>

                        <CardContent>

                            <Typography gutterBottom variant="h5" component="div">
                            Make Payment
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            Please Enter Your Card Details to make payment
                            </Typography>


                        </CardContent>

                         <Box sx={{display:"grid",justifyItems:"center",mb:2}}>
                    <div  className="App" >
                    
                        <Elements options={options} stripe={stripePromise}>
                            <CheckoutForm />
                        </Elements>
                    
                    </div>
                    </Box>
                    </Card>


                   







                <Divider variant="middle" sx={{mx:12}}/>

                {/* Footer Component */}
                <Footer/>
            
            
            </>
        )
    }
</>
)
}

export default Payment;
