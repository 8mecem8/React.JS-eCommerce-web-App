import React,{useState} from 'react'
import { PDFDownloadLink } from "@react-pdf/renderer";

// Material UI
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import InvoicePDF from './InvoicePDF/InvoicePDF';






function ContentRow({arg}) {

    {/*------------------------ Function's main Loading state ------------------------*/}
    const [open, setOpen] = useState(false);

  return (
    <>

        <TableRow sx={{ '& > *': { borderBottom: 'unset' },backgroundColor:"#edf4f4" }}>

                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </TableCell>
                
                
                 <TableCell component="th" scope="row">   
                 {arg.products.map((ar)=>{ return  <p>{ar.product.title.slice(0,50)} <br/></p> })}                         
                  </TableCell>      
                    
                  
                

                <TableCell align="right">{arg.createdAt.slice(0,10)}</TableCell>

                <TableCell align="right">{(arg.paymentIntent.amount/100).toFixed(2)}</TableCell>

                <TableCell align="right">{arg.orderStatus}</TableCell>

                <TableCell align="right">
                    {arg.products.map((ar)=>{ return  <p>{ar.product.shipping} <br/></p> })}   
                </TableCell>


        </TableRow>




        <TableRow>


            <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} sx={{backgroundColor:"mintcream"}} colSpan={6}>


                    <Collapse in={open} timeout="auto" unmountOnExit>


                            <Box sx={{ margin: 1 }}>


                                <Typography variant="h6" gutterBottom component="div">Order Details</Typography>


                                <Table size="small" aria-label="purchases">


                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Date</TableCell>
                                            <TableCell>Customer</TableCell>
                                            <TableCell>İtem(s)</TableCell>
                                            <TableCell>Quantity</TableCell>
                                            <TableCell >Amount</TableCell>
                                            <TableCell >Total price ($)</TableCell>
                                            <TableCell >Payment Type </TableCell>
                                            <TableCell >Payment Status</TableCell>
                                        </TableRow>
                                    </TableHead>


                                    <TableBody>
                                        <TableRow >
                                            <TableCell component="th" scope="row">
                                                {arg.createdAt.slice(0,10)+" "+ new Date(arg.createdAt).toTimeString().slice(0,5)}
                                            </TableCell>
                                            <TableCell>{arg.orderdBy.name}</TableCell>
                                            <TableCell>{arg.products.map((ar)=>{ return  <p>{ar.product.title.slice(0,28)}.. <br/></p> })}</TableCell>
                                            <TableCell>{arg.products.map((ar)=>{ return  <p>{ar.count} <br/></p> })}</TableCell>
                                            <TableCell>{arg.products.map((ar)=>{ return  <p>{(ar.product.price*ar.count).toFixed(2)} <br/></p> })}</TableCell>
                                            <TableCell>
                                                {(arg.paymentIntent.amount/100).toFixed(2)}
                                            </TableCell>
                                            <TableCell >{arg.paymentIntent.payment_method_types.toString().toUpperCase()}</TableCell>
                                            <TableCell sx={{color:arg.paymentIntent.status == "succeeded" && "SUCCEEDED" ? "green" :"red"}} >{arg.paymentIntent.status.toUpperCase()}</TableCell>
                                        </TableRow>
                                    </TableBody>

                                </Table>

                                <Typography variant="h6" 
                                            gutterBottom 
                                            textAlign="center" 
                                            component="div" 
                                            sx={{m:2}}>
                                                
                                                <PDFDownloadLink
                                                    document={<InvoicePDF order={arg} />}
                                                    fileName="invoice.pdf">
                                                Receipt Download PDF
                                                </PDFDownloadLink>

                                </Typography>


                            </Box>

                        
                    </Collapse>


            </TableCell>


      </TableRow>






















    </>
  )
}

export default ContentRow