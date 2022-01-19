import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux';
import {createProduct, getAllProductsByCounts, removeProduct} from '../../../UtiFunctions/utiProduct'
import Resizer from "react-image-file-resizer";
import axios from "axios"
import  {Link} from "react-router-dom";



/* Material Uİ */
import Divider from '@mui/material/Divider';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import Backdrop from '@mui/material/Backdrop';
import Button from '@mui/material/Button';
import { CircularProgress, formControlClasses } from '@mui/material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Chip from '@mui/material/Chip';
import ListSubheader from '@mui/material/ListSubheader';
import Avatar from '@mui/material/Avatar';
import {green } from '@mui/material/colors';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';



/* Custom Css */
import useStyles from './AllProductsModuleStyles'
import BarLoader from '../../BarLoader/BarLoader';
import DOubbleBubble from '../../DoubleBubble/DoubleBubble';


import logo from '../../../logo.png';
import pic from './01.jpg';


import { getSubCategories } from '../../../UtiFunctions/utiSubCategory';
import { getCategories } from '../../../UtiFunctions/utiCategory';
import ProductEditDialogModule from './ProductEditModule/ProductEditDialogModule';



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
  subcategories: [""],
  subcategory: "",
  shipping: "",
  quantity: "",
  images: [],
  color: "",
  brand: "",
};






function AdminAllProducts() 
{

    const sty = useStyles()


   

{/*------------------------ İf there is logged user ------------------------*/}
    const user = useSelector(state => state.user)



{/*------------------------ Function's main state ------------------------*/}
    const [listOpen, setListOpen] = useState(false);
    const [fetchedProductsList, setFetchedProductsList] = useState([]);
    const [delProductSlug, setDelProductSlug] = useState([]);
    const [editProductDetails, setEditProductDetails] = useState(initialState);

  
 
{/*------------------------ Product Delete Dialog State ------------------------*/}
    const [deleteProductDialogOpen,setDeleteProductDialogOpen] = useState(false)



{/*------------------------ Product Edit Dialog State ------------------------*/}
    const [editProductDialogOpen,setEditProductDialogOpen] = useState(false)

{/*------------------------ Edit Product First start Loading state ------------------------*/}
    const [loadingScreen, setLoadingScreen] = useState(false);

{/*------------------------ Snackbar states ------------------------*/}
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [snackBarMessage, setSnackBarMessage] = useState("");



{/*------------------------ BackDrop Loading Pop-Up animation State ------------------------*/}
    const [BackDropLoading,setBackDropLoading] = useState(false)
    const [delCatName,setDelCatName] = useState('')








{/*------------------------ Snackbars Functions ------------------------*/}

 const ErrorsnackCloseAction = () => 
    {
      setError(false)
    }




    const snackCloseAction = () => 
    {
      setOpen(false)
    }


{/*------------------------ Fetch All Products as Component Started ------------------------*/}

    useEffect( async()=>
    {
      //Get products in 100 list 
      await getAllProductsByCounts(100)
            .then((arg)=>{setFetchedProductsList(arg.data)})
            .catch((err)=>{console.log("error in getting all products",err)})
    },[BackDropLoading,open])



{/*------------------------ Delete Product Function ------------------------*/}


  const deleteSingleProduct =async () =>
  {
    setDeleteProductDialogOpen(false)

    setBackDropLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500));

     await removeProduct(delProductSlug,user.token)
             .then(async(result)=>
            {   

            
              
                await new Promise((resolve) => setTimeout(resolve, 1500));

                setSnackBarMessage(`Product ${result.data.title} is Deleted`)
                setOpen(true) 
                //console.log("result is =====>>>",result.data.name)

                
                
              
              setBackDropLoading(false)
            }).catch((error)=>
                    {
                    setErrorMessage(error?.response.data || error.message)
                    setError(true)
                    setBackDropLoading(false)
                    
                    })
  }








    return (
<>
<section style={{backgroundImage:`linear-gradient(rgb(255 255 255 / 0%), rgb(25 118 210)),url(${pic})`,backgroundRepeat:"no-repeat",backgroundSize:"contain",width: "100vw",height:"2000px",zIndex:1, overflowX:"hidden !important"}}>
        

      <Box
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          p: 1,
          m: 1,
          bgcolor: '#ffffffb3',
          height: '100vw'
        }}
      >

      {fetchedProductsList.map(arg =>
        {
          //console.log("fetchedProductsList one item is =====>",arg)
          
          return(

    <Card sx={{ maxWidth: 470,maxHeight:530,mx:"auto",mt:2, boxShadow: 3,p:"0 !important", }}>

          <CardMedia
            component="img"
            height="150"
            image={arg.images[0]?.url}
            alt="green iguana"
            
          />

          <CardContent>

              <Typography gutterBottom variant="h7" component="div">
                {<Link to={`/product/${arg.slug}`} style={{textDecoration:"none",marginLeft:"1px",marginRight:"1px"}}>{arg.title}</Link>}
              </Typography>

              <Divider/>

              <Typography variant="body2" color="text.secondary">
               {`${arg.description.slice(0,110)}...`}
              </Typography>

          </CardContent>

          <CardContent sx={{pt:"0px !important",m:"0px !important",display: 'flex',justifyContent: 'space-between'}}>



            <Box sx={{display: 'flex', flexDirection: 'column',}}>

              <Chip variant="outlined" color="warning" label={arg.category.name} />
              {arg.subcategory.map(arg => {return(<Chip sx={{mt:2}} variant="outlined" color="warning" label={arg.name} />)})}

            </Box>

            <Divider orientation="vertical" flexItem/>

            <Box sx={{display: 'flex', flexDirection: 'column',}}>

              <Avatar sx={{ bgcolor: green[500], width:"200px" }} variant="rounded">
                {`Price:${arg.price}`}
              </Avatar>

              <Avatar sx={{  width:"200px",mt:2 }} variant="rounded">
                {`Quantity:${arg.quantity}`}
              </Avatar>

            </Box>


          </CardContent>

            <Divider />
            
          <CardActions sx={{display: 'flex',justifyContent: 'space-evenly'}}>

            <Button onClick={()=>{
              setLoadingScreen(true)
              setEditProductDetails(arg)
              setEditProductDialogOpen(true)
              
              /* setTimeout(() => {setLoadingScreen(false)}, 5000); */

              }}  startIcon={<EditIcon />}>
              Edit
            </Button>

            <Button onClick={()=>{

              setDelProductSlug(arg.slug)
              setDeleteProductDialogOpen(true)}} startIcon={<DeleteIcon />}>
              Delete
            </Button>

          


{/*------------------------ Delete Confirm Dialog Pop-up Screen ------------------------*/}
            <Dialog
                open={deleteProductDialogOpen}
                onClose={()=>{setDeleteProductDialogOpen(false)}}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                sx={{backgroundColor:"rgb(206 225 255 / 79%)!important",}}
              >

              <DialogTitle id="alert-dialog-title" sx={{backgroundColor:"rgb(249 60 60 / 79%)",color:"white",fontWeight:"600"}}>
                {`Do you want to Delete This Product ?`}
              </DialogTitle>

              <DialogActions sx={{backgroundColor:"rgb(249 60 60 / 79%)",color:"white"}}>
                <Button onClick={()=>{setDeleteProductDialogOpen(false)}} sx={{color:"white"}}>No</Button>
                <Button onClick={deleteSingleProduct} autoFocus sx={{color:"white"}}>
                  Yes
                </Button>
              </DialogActions>

              
            </Dialog>

          </CardActions>
             
    </Card>

          )
        })}

  </Box>


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


{/*------------------------ Single Product Edit Popup Dialog Component ------------------------*/}
            <ProductEditDialogModule 
             editProductDialogOpen={editProductDialogOpen}
             setEditProductDialogOpen={setEditProductDialogOpen}
             user={user}
             editProductDetails={editProductDetails}
             loadingScreen={loadingScreen}
             setLoadingScreen={setLoadingScreen}
             setErrorMessage={setErrorMessage}
             setError={setError}
             setSnackBarMessage={setSnackBarMessage}
             setOpen={setOpen}
             />




</>
    )
}

export default AdminAllProducts
