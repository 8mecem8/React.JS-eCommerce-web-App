import React,{useState,useEffect} from 'react'
import  {Link,useNavigate} from "react-router-dom";
import { useDispatch,useSelector } from 'react-redux';




// Material UI
import { Button, CircularProgress} from '@mui/material';
import { Box } from '@mui/system';
import Divider from '@mui/material/Divider';




/* Custom Css */
import useStyles from './UserHistoryStyles'



//Main import components
import PageLoader from '../../../UtiComponents/page-loader';
import Footer from '../../Footer/Footer';
import { getUserOrders } from '../../../UtiFunctions/utiUSer';
import OrdersTable from './OrdersTable/OrdersTable';




function UserHistory() 
{

    const sty = useStyles()
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const {user,cart} = useSelector(state => ({...state}))



    {/*------------------------ Function's main Loading state ------------------------*/}

    const [enterPageLoading, setEnterPageLoading] = useState(false);
    const [userOrders, setUserOrders] = useState();
    
    {/*------------------------ Fetched User Cart state ------------------------*/}

    

    useEffect( async ()=>
    {
    setEnterPageLoading(true)
    

     await getUserOrders(user?.token)
        .then((arg)=>{setUserOrders(arg.data)})
        .catch((err)=>{console.log(err)})
    
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setEnterPageLoading(false)

    },[])



    //console.log("userOrders",userOrders)

    return (
<>   

    {    
        enterPageLoading ? (<PageLoader />)  : 
    
        (

            <>

                <OrdersTable userOrders={userOrders} />


















                <Divider variant="middle" sx={{mx:12}}/>

                {/* Footer Component */}
                <Footer/>
            </>
        )
    }
        

</> 
)
}

export default UserHistory
