import React,{useState,useEffect} from 'react'
import  {Link,useNavigate} from "react-router-dom";
import { useDispatch,useSelector } from 'react-redux';



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
import ForwardOutlinedIcon from '@mui/icons-material/ForwardOutlined';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';


/* Custom Css */
import useStyles from './CheckoutStyles'
import PageLoader from '../../UtiComponents/page-loader';
import pic1 from "./a1.png"



//Main import components
import Footer from '../Footer/Footer';



function Checkout() {

    const sty = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const {user,cart} = useSelector(state => ({...state}))



    {/*------------------------ Function's main Loading state ------------------------*/}

    const [enterPageLoading, setEnterPageLoading] = useState(false);

    useEffect( async ()=>
    {
    setEnterPageLoading(true)
    
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setEnterPageLoading(false)

    },[])
    



  return (
<>
             
    {    enterPageLoading ? (<PageLoader />)  : 
    
        (

            <>
                    

                <Divider variant="middle" sx={{mx:12}}/>

                


                    {/* Footer Component */}
                    <Footer/>
            
            
            </>
        )
    }
</>
)
}

export default Checkout;
