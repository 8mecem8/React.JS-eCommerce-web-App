import React,{useState,useEffect} from 'react'
import  {Link,useNavigate} from "react-router-dom";
import { useDispatch,useSelector } from 'react-redux';
import axios from "axios"




/* Material Uİ */
import Divider from '@mui/material/Divider';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import Backdrop from '@mui/material/Backdrop';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import Chip from '@mui/material/Chip';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Card from '@mui/material/Card';
import { CircularProgress, formControlClasses } from '@mui/material';



/* Custom Css */
import useStyles from './AdminOrdersStyles'


import PageLoader from '../../../UtiComponents/page-loader/index';
import DOubbleBubble from '../../DoubleBubble/DoubleBubble';


import logo from '../../../logo.png';
import pic from './01.jpg';
import { getOrders } from '../../../UtiFunctions/admin';
import AdminOrdersTable from './AdminOrdersTable/AdminOrdersTable';











function AdminOrders() 
{

    const sty = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const {user,cart} = useSelector(state => ({...state}))




{/*------------------------ Function's main state ------------------------*/}
    const [enterPageLoading, setEnterPageLoading] = useState(false);
    const [allOrders, setAllOrders] = useState();
  
  


{/*------------------------ Get all Categories and Subcategories list ------------------------*/} 
useEffect( async()=>
{
    //When there is a new render Set page position to 0 at Y axis
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;

    setEnterPageLoading(true)
    
    await getOrders(user.token)
            .then((arg)=>{setAllOrders(arg.data)})
            .catch((err)=>{console.error("error",err)})

    await new Promise((resolve) => setTimeout(resolve, 1000));
    setEnterPageLoading(false)
   
},[])






//console.log(allOrders)


    return (
<>
<section style={{backgroundImage:`linear-gradient(rgb(255 255 255 / 0%), rgb(25 118 210)),url(${pic})`,backgroundRepeat:"no-repeat",backgroundSize:"contain",width: "100vw",height:"2000px",zIndex:1, overflowX:"hidden !important"}}>
        
     {     enterPageLoading ? (<PageLoader />)  : 
    
        (
            <>
              <Box sx={{mx:5,my:5}}>
                    <AdminOrdersTable userToken={user.token} userOrders={allOrders} />
              </Box>

            </>
        )
        
      }



{/*------------------------  Loading------------------------*/}
    <Backdrop sx={{ color: '#fff',mt:-0 ,zIndex: (theme) => theme.zIndex.drawer + 1 }} /* open={"zurna"} */>
        <DOubbleBubble speed={2}/><img src={logo} style={{mixBlendMode: "hard-light",backgroundColor:"#1976d2",borderRadius:"50%",pointerEvents:"none",display:"flex",height: "43px",zIndex:1000}}   alt="logo" />
    </Backdrop>





  </section>  
</>
    )
}

export default AdminOrders
