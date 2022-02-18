import React,{useState} from 'react'
import  {Link,useNavigate} from "react-router-dom";




// Material UI
import { Button, CircularProgress} from '@mui/material';
import { Box } from '@mui/system';
import Divider from '@mui/material/Divider';
import PropTypes from 'prop-types';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';




/* Custom Css */
import useStyles from './OrdersTableStyles'



//Main import components
import PageLoader from '../../../../UtiComponents/page-loader';
import TableContent from './TableContent/TableContent';






function OrdersTable({userOrders}) 
{

    const sty = useStyles()
    



    {/*------------------------ Function's main Loading state ------------------------*/}

    const [enterPageLoading, setEnterPageLoading] = useState(false);
    const [os, setOs] = useState();
    
   

    

    console.log("userOrders1111",userOrders?.length > 0 ? userOrders[0]  :"yok" )

return (
<>   
    <TableContainer component={Paper} sx={{mt:2,mb:2}}>
        <Typography>Order İnformation</Typography>
        <Table aria-label="collapsible table">


            <TableHead>
            <TableRow>
                <TableCell />
                <TableCell>Order Title</TableCell>
                <TableCell align="right">Order Date</TableCell>
                <TableCell align="right">Total Price</TableCell>
                <TableCell align="right">Count</TableCell>
                <TableCell align="right">Shipping</TableCell>
            </TableRow>
            </TableHead>

                <TableContent userOrders={userOrders} />

            <TableBody>
            
            </TableBody>

        </Table>
    </TableContainer>
    
        

</> 
)
}

export default OrdersTable
