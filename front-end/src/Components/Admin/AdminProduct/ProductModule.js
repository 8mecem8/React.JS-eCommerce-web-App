import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux';
import {createProduct} from '../../../UtiFunctions/utiProduct'
import Resizer from "react-image-file-resizer";
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
import useStyles from './ProductModuleStyles'
import BarLoader from '../../BarLoader/BarLoader';
import DOubbleBubble from '../../DoubleBubble/DoubleBubble';


import logo from '../../../logo.png';
import pic from './01.jpg';


import { getSubCategories } from '../../../UtiFunctions/utiSubCategory';
import { getCategories } from '../../../UtiFunctions/utiCategory';



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




function AdminProduct() 
{

    const sty = useStyles()


   

{/*------------------------ İf there is logged user ------------------------*/}
    const user = useSelector(state => state.user)



{/*------------------------ Function's main state ------------------------*/}
    const [values, setValues] = useState(initialState);
    const [listOpen, setListOpen] = useState(false);
  
     // destructure
  let { title, description, price, categories, category, subcategories, shipping, quantity, images, colors, brands, color, brand,} = values;

    console.log("Main Form State",values)

{/*------------------------ Subcategory Delete Dialog State ------------------------*/}
    const [dialogOpen,setDialogOpen] = useState(false)

{/*------------------------ Loading images ------------------------*/}
    const [imageloading,setImageloading] = useState(false)


{/*------------------------ Create Product Loading state ------------------------*/}
    const [createLoading,setCreateLoading] = useState(false)



{/*------------------------ Snackbar states ------------------------*/}
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [snackBarMessage, setSnackBarMessage] = useState("");



{/*------------------------ BackDrop State ------------------------*/}
    const [BackDropLoading,setBackDropLoading] = useState(false)
    const [delCatName,setDelCatName] = useState('')





{/*------------------------ Get all Categories and Subcategories list ------------------------*/} 
useEffect( async()=>
{
    const ListOfSubCategories = await getSubCategories()
    const ListOfCategories = await getCategories()

    //console.log("ListOfSubCategories.data",ListOfSubCategories.data)
    //console.log("ListOfCategories map",ListOfSubCategories.data.map(arg => arg.parent.name))


    setValues({...values,categories : ListOfCategories.data,subcategories : ListOfSubCategories.data})
      
   
},[])









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
     //console.log(e.target.name, " ----- ", e.target.value);
     

  };


{/*------------------------ Form submit function ------------------------*/}    

const inputFormHandleSubmit = async (e) => {

    e.preventDefault();

    setCreateLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500));

    createProduct(values, user.token)
      .then(async(res) => {
        //console.log(res?.data); 
        
               
        setSnackBarMessage(`Product of ${res?.data.title} has been created , Details of the Product are `)
        setOpen(true)
        setCreateLoading(false)
        //console.log("values",values)
        await new Promise((resolve) => setTimeout(resolve, 2000));
        window.location.reload()
      })
      .catch((error) => {
           // console.log("error?.response.data",error?.response.data,"error.message",error?.message)
            setErrorMessage(error?.response.data || error?.message)
            setError(true)
            setCreateLoading(false)
        
      });
  };



{/*------------------------ İmage Upload ------------------------*/}


const imageUpload = async (e) =>
{
    setImageloading(true)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    let files = e.target.files
    //console.log("files are ===>",typeof(files))

    let allUploadedFiles = values.images

    if(files) 
     {[...files].map(file => {Resizer.imageFileResizer(file,720,720,"JPEG",100, 0,(uri) =>
            {
            
            axios.post(
                `${process.env.REACT_APP_API}/uploadimages`,
                { image: uri },
                {
                  headers: {
                    authtoken: user ? user.token : "",
                  },
                }
              )
              .then((res) => {
                console.log("IMAGE UPLOAD RES DATA", res);
                
                allUploadedFiles.push(res.data);

                setValues({ ...values, images: allUploadedFiles });

                setImageloading(false)
              })
              .catch((err) => {
                
                console.log("CLOUDINARY UPLOAD ERR", err);
                setImageloading(false)
              });
            
            
            
            
            
            
            
            },"base64");})}
 

}




const deletePicture = (public_id) =>
{
   axios.post(
        `${process.env.REACT_APP_API}/removeimage`,
        { public_id },
        {
          headers: {
            authtoken: user ? user.token : "",
          },
        }
      )
      .then((res) => {
        
        const { images } = values;
        let filteredImages = images.filter((item) => {
          return item.public_id !== public_id;
        });
        setValues({ ...values, images: filteredImages });
      })
      .catch((err) => {
        console.log(err);
        
      });
}









    return (
<>
<section style={{backgroundImage:`linear-gradient(rgb(255 255 255 / 0%), rgb(25 118 210)),url(${pic})`,backgroundRepeat:"no-repeat",backgroundSize:"contain",width: "100vw",height:"2000px",zIndex:1, overflowX:"hidden !important"}}>
        

        <form onSubmit={inputFormHandleSubmit}>

       
        <Grid container  spacing={4} sx={{m:0, bgcolor:"#ffffffcc",mx:"auto",maxHeight:"1780px" ,borderRadius:"5px",pb:"50px",
        width:{xs: "460px",sm: "540px",md: "800px",lg: "800px", xl: "800px",} ,
        ml:{xs: 1.5,sm: "auto",md: "auto",lg: "auto", xl: "auto",}, 
        mr:{xs: 5,sm: "auto",md: "auto",lg: "auto", xl: "auto",}}} className={sty.mGrid}>


            <Grid item xs={6} sx={{pl:{xs: "24px !important",sm: "30px !important",md: "62px !important",lg: "62px !important", xl: "82px !important",}}}>
                <TextField onChange={inputHandleChange}  id="filled-helperText" label="Title" name='title' defaultValue={title} helperText="Some important text"   variant="standard"
                sx={{width: {xs: 175,sm: 200,md: 244,lg: 244, xl: 244,}}}/>
            </Grid>

            

            <Grid item xs={6} sx={{pl:{xs: "24px !important",sm: "30px !important",md: "62px !important",lg: "62px !important", xl: "82px !important",}}}>
                <TextField onChange={inputHandleChange}  id="filled-helperText" label="Price" name='price' defaultValue={price} helperText="Some important text"   variant="standard"
                sx={{width: {xs: 175,sm: 200,md: 244,lg: 244, xl: 244,}}}/>
            </Grid>

             <Grid item xs={6} sx={{pl:{xs: "24px !important",sm: "30px !important",md: "62px !important",lg: "62px !important", xl: "82px !important",}}}>
                <InputLabel id="demo-multiple-name-label">Shipping</InputLabel>
                <Select onChange={inputHandleChange} helperText="Some important text"   id="simple-select" label="Shipping" name='shipping' sx={{width: {xs: 175,sm: 200,md: 244,lg: 244, xl: 244,}}}  variant="standard">

                                <MenuItem value="Yes">yes</MenuItem>
                                <MenuItem value="No">no</MenuItem>

      
                </Select>
            </Grid>

            <Grid item xs={6} sx={{pl:{xs: "24px !important",sm: "30px !important",md: "62px !important",lg: "62px !important", xl: "82px !important",}}}>
                <TextField onChange={inputHandleChange}  id="filled-helperText" label="Quantity" name='quantity' defaultValue={quantity} helperText="Some important text"   variant="standard"
                sx={{width: {xs: 175,sm: 200,md: 244,lg: 244, xl: 244,}}}/>
            </Grid>

             <Grid item xs={6} sx={{pl:{xs: "24px !important",sm: "30px !important",md: "62px !important",lg: "62px !important", xl: "82px !important",}}}>
                <InputLabel id="demo-multiple-name-label">Category</InputLabel>
                <Select onChange={inputHandleChange} helperText="Some important text"   id="simple-select" label="Category" name='category' sx={{width: {xs: 175,sm: 200,md: 244,lg: 244, xl: 244,}}}  variant="standard" >

                               
                                {values.categories.map((arg,i) =>{return(<MenuItem value={arg._id} key={i} >{arg.name}</MenuItem>)})}
      
                </Select>
            </Grid>


            <Grid item xs={6} sx={{pl:{xs: "24px !important",sm: "30px !important",md: "62px !important",lg: "62px !important", xl: "82px !important",}}}>
                <InputLabel id="demo-multiple-name-label">Subcategory</InputLabel>
                <Select onChange={inputHandleChange} helperText="Some important text"   id="simple-select" label="Subcategory" name='subcategory' sx={{width: {xs: 175,sm: 200,md: 244,lg: 244, xl: 244,}}}  value={[...values.subcategory]}
                        multiple multiline maxRows={6} variant="standard" input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                         renderValue={(selected) => {
                             //console.log("selected is ==>",selected)
                             return(<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (<Chip key={value} label={value} />))}</Box>)}}  >

                               
                                {values.subcategories.filter(arg => arg.parent?._id === values.category).map((arg,i) =>{return(<MenuItem value={arg._id} key={i} >{arg.name}</MenuItem>)})}
      
                </Select>
            </Grid>
            
            <Grid item xs={6} sx={{pt:"0px !important",pl:{xs: "24px !important",sm: "30px !important",md: "62px !important",lg: "62px !important", xl: "82px !important",}}}>
                <TextField onChange={inputHandleChange}  id="filled-helperText" label="Color" name='color' defaultValue={color} helperText="Please Enter a Color for Product"   variant="standard"
                sx={{width: {xs: 175,sm: 200,md: 244,lg: 244, xl: 244,}}}/>
            </Grid>


            <Grid item xs={12} sx={{pl:{xs: "24px !important",sm: "30px !important",md: "62px !important",lg: "62px !important", xl: "82px !important",}}}>
                <InputLabel id="demo-multiple-name-label" sx={{mb:2}}>Please Upload Pictures for the Product</InputLabel>
                    <label htmlFor="contained-button-file">
                        <input accept="image/*" onChange={imageUpload} id="contained-button-file" multiple type="file" className={sty.hide} />
                        <Button variant="contained" component="span">
                        Upload
                        </Button>
                    </label>
                    
                    {imageloading ? <CircularProgress size={80} sx={{ml:20}} /> :values.images.map(arg => 
                        {
                            //console.log("args are ====>",arg)
                            return(
                                <Badge color="primary"  badgeContent="X" onClick={()=>{deletePicture(arg.public_id)}}  className={sty.mousePoint} anchorOrigin={{vertical: 'top',horizontal: 'right',}} sx={{transform: 'translate3d(0, 0, 0)'}}>
                                <Card    sx={{ml:2,mt:2, maxWidth: 90, maxHeight:80,display: 'inline-block',transform: 'translate3d(0, 0, 0)' }}>
                                    
                                    <Avatar alt={arg.public_id} src={arg.url} variant="square"  sx={{ width: 80, height: 56, mt: 0, p: 0, }}/>
                                
                                </Card>
                                </Badge>

                            )
                        })}
  
                   
            </Grid>


            


            <Grid item xs={8} sx={{pl:{xs: "24px !important",sm: "30px !important",md: "62px !important",lg: "62px !important", xl: "82px !important",}}}>
                <TextField onChange={inputHandleChange}  id="filled-helperText" label="Description" name='description' defaultValue={description}  helperText="Please Enter Description for Product" multiline
          maxRows={10}  sx={{width: {xs: 410,sm: 454,md: 644,lg: 644, xl: 644,}}} />
            </Grid>

           
            <Grid item xs={6} sx={{pl:{xs: "24px !important",sm: "30px !important",md: "62px !important",lg: "62px !important", xl: "82px !important",}}}>
            { createLoading ? <BarLoader speed={2} /> :<Button variant="contained" disabled={!values.title || !values.description || !values.price || !values.quantity || !values.category || !values.subcategory || !values.shipping || !values.images || !values.color} type="submit" sx={{width:"244px"}}>Submit</Button>}
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
