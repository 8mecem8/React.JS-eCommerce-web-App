import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux';
import {createProduct} from '../../../UtiFunctions/utiProduct'




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



/* Custom Css */
import useStyles from './ProductModuleStyles'
import BarLoader from '../../BarLoader/BarLoader';
import DOubbleBubble from '../../DoubleBubble/DoubleBubble';


import logo from '../../../logo.png';
import pic from './01.jpg';



{/*------------------------ Snackbar color setting ------------------------*/}
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

{/*------------------------ Snackbar slide effect ------------------------*/}
function TransitionDown(props) {
  return <Slide {...props} direction="down" />;
}




const initialState = {
  title: "",
  description: "",
  price: "",
  categories: [""],
  category: "",
  subs: [""],
  shipping: "",
  quantity: "",
  images: [""],
  color: "",
  brand: "",
};




function AdminProduct() 
{

    const sty = useStyles()


   

{/*------------------------ İf there is logged user ------------------------*/}
    const user = useSelector(state => state.user)



{/*------------------------ Function's main state ------------------------*/}
    const [values, setValues] = useState(initialState);
    const [listOpen, setListOpen] = useState(false);
  
     // destructure
  let { title, description, price, categories, category, subs, shipping, quantity, images, colors, brands, color, brand,} = values;



{/*------------------------ Subcategory Delete Dialog State ------------------------*/}
    const [dialogOpen,setDialogOpen] = useState(false)



{/*------------------------ Create Product Loading state ------------------------*/}
    const [createLoading,setCreateLoading] = useState(false)



{/*------------------------ Snackbar states ------------------------*/}
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [snackBarMessage, setSnackBarMessage] = useState("");



{/*------------------------ Delete Subcategory State ------------------------*/}
    const [BackDropLoading,setBackDropLoading] = useState(false)
    const [delCatName,setDelCatName] = useState('')


{/*------------------------ Create Category list Functions ------------------------*/} 
    const listHandleClick = () => {
    setListOpen(!listOpen);
  };










{/*------------------------ Snackbars Functions ------------------------*/}

 const ErrorsnackCloseAction = () => 
    {
      setError(false)
    }




    const snackCloseAction = () => 
    {
      setOpen(false)
    }


{/*------------------------ İnput handle function ------------------------*/}    
    const inputHandleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
     console.log(e.target.name, " ----- ", e.target.value);
     

  };


{/*------------------------ Form submit function ------------------------*/}    

const inputFormHandleSubmit = async (e) => {

    e.preventDefault();

    setCreateLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    createProduct(values, user.token)
      .then((res) => {
        console.log(res?.data); 
        
        
        
        setSnackBarMessage(`Product of ${res?.data.title} has been created , Details of the Product are `)
        setOpen(true)
        setCreateLoading(false)
        console.log("values",values)
        location.reload()
      })
      .catch((error) => {
            console.log("error?.response.data",error?.response.data,"error.message",error?.message)
            setErrorMessage(error?.response.data || error?.message)
            setError(true)
            setCreateLoading(false)
        
      });
  };






    return (
<>
<section style={{backgroundImage:`linear-gradient(rgb(255 255 255 / 0%), rgb(25 118 210)),url(${pic})`,backgroundRepeat:"no-repeat",backgroundSize:"cover",width: "100vw",height:"1000px",zIndex:1, overflowX:"hidden !important"}}>
        

        <form onSubmit={inputFormHandleSubmit}>

       
        <Grid container  spacing={4} sx={{m:0, bgcolor:"#ffffffcc",mx:"auto",maxWidth:"800px",maxHeight:"120vw",borderRadius:"5px",pb:"50px"}} className={sty.mGrid}>


            <Grid item xs={6}>
                <TextField onChange={inputHandleChange}  id="filled-helperText" label="Title" name='title' defaultValue={title} helperText="Some important text"   variant="standard"
                sx={{width: {xs: 175,sm: 200,md: 244,lg: 244, xl: 244,}}}/>
            </Grid>

            

            <Grid item xs={6}>
                <TextField onChange={inputHandleChange}  id="filled-helperText" label="Price" name='price' defaultValue={price} helperText="Some important text"   variant="standard"
                sx={{width: {xs: 175,sm: 200,md: 244,lg: 244, xl: 244,}}}/>
            </Grid>

             <Grid item xs={6}>
                <InputLabel id="demo-multiple-name-label">Shipping</InputLabel>
                <Select onChange={inputHandleChange} helperText="Some important text"   id="simple-select" label="Shipping" name='shipping' sx={{width: {xs: 175,sm: 200,md: 244,lg: 244, xl: 244,}}}  variant="standard">

                                <MenuItem value="Yes">yes</MenuItem>
                                <MenuItem value="No">no</MenuItem>

      
                </Select>
            </Grid>

            <Grid item xs={6}>
                <TextField onChange={inputHandleChange}  id="filled-helperText" label="Quantity" name='quantity' defaultValue={quantity} helperText="Some important text"   variant="standard"
                sx={{width: {xs: 175,sm: 200,md: 244,lg: 244, xl: 244,}}}/>
            </Grid>

             <Grid item xs={6}>
                <TextField onChange={inputHandleChange}  id="filled-helperText" label="Brand" name='brand' defaultValue={brand} helperText="Some important text"   variant="standard"
                sx={{width: {xs: 175,sm: 200,md: 244,lg: 244, xl: 244,}}}/>
            </Grid>


            <Grid item xs={6}>
                <TextField onChange={inputHandleChange}  id="filled-helperText" label="Color" name='color' defaultValue={color} helperText="Some important text"   variant="standard"
                sx={{width: {xs: 175,sm: 200,md: 244,lg: 244, xl: 244,}}}/>
            </Grid>


            <Grid item xs={8}>
                <TextField onChange={inputHandleChange}  id="filled-helperText" label="Description" name='description' defaultValue={description}  helperText="Some important text" multiline
          maxRows={6}  sx={{width: {xs: 440,sm: 554,md: 644,lg: 644, xl: 644,}}} />
            </Grid>

           
            <Grid item xs={6}>
            { createLoading ? <BarLoader speed={2} /> :<Button variant="contained" type="submit" sx={{width:"244px"}}>Submit</Button>}
            </Grid>
        </Grid>




       
       
       
       
       </form>





{/*------------------------  Loading------------------------*/}
    <Backdrop sx={{ color: '#fff',mt:-0 ,zIndex: (theme) => theme.zIndex.drawer + 1 }} open={BackDropLoading}>
        <DOubbleBubble speed={2}/><img src={logo} style={{mixBlendMode: "hard-light",backgroundColor:"#1976d2",borderRadius:"50%",pointerEvents:"none",display:"flex",height: "43px",zIndex:1000}}   alt="logo" />
    </Backdrop>




{/*------------------------ Snackbar ------------------------*/}
        <Snackbar open={open} autoHideDuration={10000} onClose={snackCloseAction}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} TransitionComponent={TransitionDown}>
            <Alert onClose={snackCloseAction} severity="success" sx={{ width: '100%' }}>
                {snackBarMessage}
            </Alert>
        </Snackbar>



         <Snackbar open={error} autoHideDuration={10000} onClose={ErrorsnackCloseAction}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} TransitionComponent={TransitionDown}>

            <Alert onClose={ErrorsnackCloseAction} severity="error" sx={{ width: '100%' }}>
                {`${errorMessage}`}
            </Alert>

         </Snackbar>


  </section>  
</>
    )
}

export default AdminProduct
