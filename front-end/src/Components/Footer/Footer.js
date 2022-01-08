import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux';
import  {Link} from "react-router-dom";




// Material UI
import { CircularProgress} from '@mui/material';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';



/* Custom Css */
import useStyles from './FooterStyles'
import BarLoader from '../BarLoader/BarLoader';
import DOubbleBubble from '../DoubleBubble/DoubleBubble';


import PageLoader from '../../UtiComponents/page-loader/index'







function Footer()
{
    const sty = useStyles()





{/*------------------------ Function's main Loading state ------------------------*/}

    const [enterPageLoading, setEnterPageLoading] = useState(false);





  

    return (
        <>
        {enterPageLoading ? (<PageLoader />)  : 
        (
        <section style={{backgroundColor:"rgb(3 52 100)",width:"100vw",height:"100vw",overflowY:"hidden",}}>

            
            <Box sx={{ bgcolor: '#37475a', height: '30px', width:"100vw" }} />
           



            <Grid container direction="row" justifyContent="start" alignItems="start" sx={{mx:"auto"}}>

                <Grid item xs={2}> 
                </Grid>

                <Grid item xs={1} sx={{textAlign: 'center',display: 'grid', gridTemplateRows: 'repeat(7, 0.3fr)'}}>
                    <Typography sx={{fontSize:"16px",fontWeight: 700,color:"#DDD",textAlign: 'start',m:"6px 0 14px 0",whiteSpace:"nowrap"}}>Get to Know Us</Typography>
                     <Link to="/" style={{textAlign: 'start',textDecoration:"none",marginLeft:"0px",marginRight:"0px",color:"#DDD",fontSize:"14px"}}>Careers</Link>
                     <Link to="/" style={{textAlign: 'start',textDecoration:"none",marginLeft:"0px",marginRight:"0px",color:"#DDD",fontSize:"14px"}}>Blog</Link>
                     <Link to="/" style={{textAlign: 'start',textDecoration:"none",marginLeft:"0px",marginRight:"0px",color:"#DDD",fontSize:"14px"}}>About Our Ecommerce</Link>
                     <Link to="/" style={{textAlign: 'start',textDecoration:"none",marginLeft:"0px",marginRight:"0px",color:"#DDD",fontSize:"14px"}}>Sustainability</Link>
                     <Link to="/" style={{textAlign: 'start',textDecoration:"none",marginLeft:"0px",marginRight:"0px",color:"#DDD",fontSize:"14px"}}>Press Center</Link>
                     <Link to="/" style={{textAlign: 'start',textDecoration:"none",marginLeft:"0px",marginRight:"0px",color:"#DDD",fontSize:"14px"}}>Investor Relations</Link>
                </Grid>

                <Grid item xs={1} sx={{textAlign: 'center',display: 'grid', gridTemplateRows: 'repeat(9, 0.3fr)',ml:20}}>
                    <Typography sx={{fontSize:"16px",fontWeight: 700,color:"#DDD",textAlign: 'start',m:"6px 0 14px 0",whiteSpace:"nowrap"}}>Make Money with Us</Typography>
                     <Link to="/" style={{textAlign: 'start',textDecoration:"none",marginLeft:"0px",marginRight:"0px",color:"#DDD",fontSize:"14px"}}>Sell products on Our Ecommerce Platform</Link>
                     <Link to="/" style={{textAlign: 'start',textDecoration:"none",marginLeft:"0px",marginRight:"0px",color:"#DDD",fontSize:"14px"}}>Sell apps on Our Ecommerce Platform</Link>
                     <Link to="/" style={{textAlign: 'start',textDecoration:"none",marginLeft:"0px",marginRight:"0px",color:"#DDD",fontSize:"14px"}}>Become an Affiliate</Link>
                     <Link to="/" style={{textAlign: 'start',textDecoration:"none",marginLeft:"0px",marginRight:"0px",color:"#DDD",fontSize:"14px"}}>Start a package delivery business</Link>
                     <Link to="/" style={{textAlign: 'start',textDecoration:"none",marginLeft:"0px",marginRight:"0px",color:"#DDD",fontSize:"14px"}}>Advertise Your Products</Link>
                     <Link to="/" style={{textAlign: 'start',textDecoration:"none",marginLeft:"0px",marginRight:"0px",color:"#DDD",fontSize:"14px"}}>Self-Publish with Us</Link>
                     <Link to="/" style={{textAlign: 'start',textDecoration:"none",marginLeft:"0px",marginRight:"0px",color:"#DDD",fontSize:"14px"}}>Host an Ecommerce Hub</Link>
                     <Link to="/" style={{textAlign: 'start',textDecoration:"none",marginLeft:"0px",marginRight:"0px",color:"#DDD",fontSize:"14px"}}>See More Ways to Make Money</Link>


                </Grid>

                <Grid item xs={1} sx={{textAlign: 'center',display: 'grid', gridTemplateRows: 'repeat(10, 0.3fr)',ml:20}}>
                    <Typography sx={{fontSize:"16px",fontWeight: 700,color:"#DDD",textAlign: 'start',m:"6px 0 14px 0",whiteSpace:"nowrap"}}>Ecommerce Payment Products</Typography>
                     <Link to="/" style={{textAlign: 'start',textDecoration:"none",marginLeft:"0px",marginRight:"0px",color:"#DDD",fontSize:"14px"}}>Rewards Visa Signature Cards</Link>
                     <Link to="/" style={{textAlign: 'start',textDecoration:"none",marginLeft:"0px",marginRight:"0px",color:"#DDD",fontSize:"14px"}}>Store Card</Link>
                     <Link to="/" style={{textAlign: 'start',textDecoration:"none",marginLeft:"0px",marginRight:"0px",color:"#DDD",fontSize:"14px"}}>Secured Card</Link>
                     <Link to="/" style={{textAlign: 'start',textDecoration:"none",marginLeft:"0px",marginRight:"0px",color:"#DDD",fontSize:"14px"}}>Business Card</Link>
                     <Link to="/" style={{textAlign: 'start',textDecoration:"none",marginLeft:"0px",marginRight:"0px",color:"#DDD",fontSize:"14px"}}>Business Line of Credit</Link>
                     <Link to="/" style={{textAlign: 'start',textDecoration:"none",marginLeft:"0px",marginRight:"0px",color:"#DDD",fontSize:"14px"}}>Shop with Points</Link>
                     <Link to="/" style={{textAlign: 'start',textDecoration:"none",marginLeft:"0px",marginRight:"0px",color:"#DDD",fontSize:"14px"}}>Credit Card Marketplace</Link>
                     <Link to="/" style={{textAlign: 'start',textDecoration:"none",marginLeft:"0px",marginRight:"0px",color:"#DDD",fontSize:"14px"}}>Reload Your Balance</Link>
                     <Link to="/" style={{textAlign: 'start',textDecoration:"none",marginLeft:"0px",marginRight:"0px",color:"#DDD",fontSize:"14px"}}>Currency Converter</Link>



                </Grid>

                <Grid item xs={1} sx={{textAlign: 'center',display: 'grid', gridTemplateRows: 'repeat(9, 0.3fr)',ml:20}}>
                    <Typography sx={{fontSize:"16px",fontWeight: 700,color:"#DDD",textAlign: 'start',m:"6px 0 14px 0",whiteSpace:"nowrap"}}>Let Us Help You</Typography>
                     <Link to="/" style={{textAlign: 'start',textDecoration:"none",marginLeft:"0px",marginRight:"0px",color:"#DDD",fontSize:"14px"}}>Ecommerce and COVID-19</Link>
                     <Link to="/" style={{textAlign: 'start',textDecoration:"none",marginLeft:"0px",marginRight:"0px",color:"#DDD",fontSize:"14px"}}>Your Account</Link>
                     <Link to="/" style={{textAlign: 'start',textDecoration:"none",marginLeft:"0px",marginRight:"0px",color:"#DDD",fontSize:"14px"}}>Your Orders</Link>
                     <Link to="/" style={{textAlign: 'start',textDecoration:"none",marginLeft:"0px",marginRight:"0px",color:"#DDD",fontSize:"14px"}}>Shipping Rates & Policies</Link>
                     <Link to="/" style={{textAlign: 'start',textDecoration:"none",marginLeft:"0px",marginRight:"0px",color:"#DDD",fontSize:"14px"}}>Returns & Replacements</Link>
                     <Link to="/" style={{textAlign: 'start',textDecoration:"none",marginLeft:"0px",marginRight:"0px",color:"#DDD",fontSize:"14px"}}>Manage Your Content and Devices</Link>
                     <Link to="/" style={{textAlign: 'start',textDecoration:"none",marginLeft:"0px",marginRight:"0px",color:"#DDD",fontSize:"14px"}}>Ecommerce Assistant</Link>
                     <Link to="/" style={{textAlign: 'start',textDecoration:"none",marginLeft:"0px",marginRight:"0px",color:"#DDD",fontSize:"14px"}}>Help</Link>


                </Grid>

                <Grid item xs={2}>  
                </Grid>

            </Grid>


        </section>
        )}
        </>
    )
}

export default Footer
