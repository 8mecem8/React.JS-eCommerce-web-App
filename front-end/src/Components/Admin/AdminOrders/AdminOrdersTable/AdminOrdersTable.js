import React,{useState} from 'react'


// Material UI
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';



/* Custom Css */
import useStyles from './AdminOrdersTableStyles'



//Main import components
import ContentRow from './TableContent/AdminContentRow';
import AdminContentRow from './TableContent/AdminContentRow';




function AdminOrdersTable({userOrders,userToken}) 
{
    const sty = useStyles()
    
    {/*------------------------ Function's main Loading state ------------------------*/}

    const [enterPageLoading, setEnterPageLoading] = useState(false);
    

return (
<>   
    <TableContainer component={Paper} sx={{mb:2}}>
        <Typography variant='h3' textAlign="center" fontWeight="500" sx={{mx:"auto",my:3}}>All Orders</Typography>
        <Table aria-label="collapsible table">

            <TableHead sx={{backgroundColor:"#e1efff"}}>
            <TableRow>
                <TableCell />
                <TableCell >Order Title</TableCell>
                <TableCell >Ordered By</TableCell>
                <TableCell align="right">Order Date</TableCell>
                <TableCell align="right">Total Price</TableCell>
                <TableCell align="right">Order Status</TableCell>
                <TableCell align="right">Shipping</TableCell>
            </TableRow>
            </TableHead>

            <TableBody>
                {userOrders?.map((order,i)=>{return(<> <AdminContentRow arg={order} userToken={userToken} />  </>)})}
            </TableBody>

        </Table>
    </TableContainer>
</> 
)
}

export default AdminOrdersTable
