import React,{useState,useEffect} from 'react'
import axios from "axios"
import Resizer from "react-image-file-resizer";



/* Material Uİ */

import Divider from '@mui/material/Divider';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
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
import useStyles from './ProductEditDialogModuleStyles'
import BarLoader from '../../../BarLoader/BarLoader';
import DOubbleBubble from '../../../DoubleBubble/DoubleBubble';


import logo from '../../../../logo.png';
import { getSubCategories } from '../../../../UtiFunctions/utiSubCategory';
import { getCategories } from '../../../../UtiFunctions/utiCategory';











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






function ProductEditDialogModule({editProductDialogOpen,setEditProductDialogOpen,user}) 
{

    const sty = useStyles()


{/*------------------------ Function's main state ------------------------*/}
    const [values, setValues] = useState(initialState);


{/*------------------------ Create Product Loading state ------------------------*/}
    const [editLoading,setEditLoading] = useState(false)

{/*------------------------ Loading images ------------------------*/}
    const [imageloading,setImageloading] = useState(false)


{/*------------------------ Get all Categories and Subcategories list ------------------------*/} 
useEffect( async()=>
{
    const ListOfSubCategories = await getSubCategories()
    const ListOfCategories = await getCategories()

    //console.log("ListOfSubCategories.data",ListOfSubCategories.data)
    //console.log("ListOfCategories map",ListOfSubCategories.data.map(arg => arg.parent.name))


    setValues({...values,categories : ListOfCategories.data,subcategories : ListOfSubCategories.data})
      
   
},[])




{/*------------------------ Delete Picture function ------------------------*/}   
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





{/*------------------------ İnput handle function ------------------------*/}    
    const inputHandleChange = (e) => 
{
    setValues({ ...values, [e.target.name]: e.target.value });
     //console.log(e.target.name, " ----- ", e.target.value);
     

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







{/*------------------------ Edit Form function ------------------------*/}   
const editProductSubmit= () =>
{

}








    return (
        <>
            
{/*------------------------ Category List Edit Screen------------------------*/}

<Dialog
        open={editProductDialogOpen}
        onClose={()=>{setEditProductDialogOpen(false)}}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        
      >

        <DialogTitle id="alert-dialog-title" >
          {`Edit/update Selected Product`}
        </DialogTitle>

        <Divider/>

<form  autoComplete="off" onSubmit={editProductSubmit} >

         <DialogContent >
          <DialogContentText id="alert-dialog-description" >
            <InputLabel htmlFor="component-simple" sx={{mx: 'auto'}}>You can change Category Name</InputLabel > 

            
            <Grid container  spacing={4} sx={{m:0, bgcolor:"#ffffffcc",mx:"auto",borderRadius:"5px",
        width:{xs: "460px",sm: "540px",md: "560px",lg: "560px", xl: "560px",} ,
        ml:{xs: 1.5,sm: "auto",md: "auto",lg: "auto", xl: "auto",}, 
        mr:{xs: 5,sm: "auto",md: "auto",lg: "auto", xl: "auto",}}} >


            <Grid item xs={6} sx={{pl:{xs: "14px !important",sm: "14px !important",md: "14px !important",lg: "14px!important", xl: "14px !important",}}}>
                <TextField onChange={inputHandleChange}  id="filled-helperText" label="Title" name='title' defaultValue={values.title} helperText="Some important text"   variant="standard"
                sx={{width: {xs: 175,sm: 200,md: 244,lg: 244, xl: 244,}}}/>
            </Grid>

            

            <Grid item xs={6} sx={{pl:{xs: "14px !important",sm: "14px !important",md: "14px !important",lg: "14px !important", xl: "14px !important",}}}>
                <TextField onChange={inputHandleChange}  id="filled-helperText" label="Price" name='price' defaultValue={values.price} helperText="Some important text"   variant="standard"
                sx={{width: {xs: 175,sm: 200,md: 244,lg: 244, xl: 244,}}}/>
            </Grid>

             <Grid item xs={6} sx={{pl:{xs: "14px !important",sm: "14px !important",md: "14px !important",lg: "14px !important", xl: "14px !important",}}}>
                <InputLabel id="demo-multiple-name-label">Shipping</InputLabel>
                <Select onChange={inputHandleChange} helperText="Some important text"   id="simple-select" defaultValue={values.shipping} label="Shipping" name='shipping' sx={{width: {xs: 175,sm: 200,md: 244,lg: 244, xl: 244,}}}  variant="standard">

                                <MenuItem value="Yes">yes</MenuItem>
                                <MenuItem value="No">no</MenuItem>

      
                </Select>
            </Grid>

            <Grid item xs={6} sx={{pl:{xs: "14px!important",sm: "14px !important",md: "14px !important",lg: "14px!important", xl: "14px!important",}}}>
                <TextField onChange={inputHandleChange}  id="filled-helperText" label="Quantity" name='quantity' defaultValue={values.quantity} helperText="Some important text"   variant="standard"
                sx={{width: {xs: 175,sm: 200,md: 244,lg: 244, xl: 244,}}}/>
            </Grid>

             <Grid item xs={6} sx={{pl:{xs: "14px !important",sm: "14px !important",md: "14px !important",lg: "14px !important", xl: "14px !important",}}}>
                <InputLabel id="demo-multiple-name-label">Category</InputLabel>
                <Select onChange={inputHandleChange} helperText="Some important text"   id="simple-select" label="Category"defaultValue={values.category} name='category' sx={{width: {xs: 175,sm: 200,md: 244,lg: 244, xl: 244,}}}  variant="standard" >

                               
                                {values.categories.map((arg,i) =>{return(<MenuItem value={arg._id} key={i} >{arg.name}</MenuItem>)})}
      
                </Select>
            </Grid>


            <Grid item xs={6} sx={{pl:{xs: "14px !important",sm: "14px !important",md: "14px !important",lg:"14px !important", xl: "14px !important",}}}>
                <InputLabel id="demo-multiple-name-label">Subcategory</InputLabel>
                <Select onChange={inputHandleChange} helperText="Some important text"   id="simple-select" label="Subcategory" name='subcategory' sx={{width: {xs: 175,sm: 200,md: 244,lg: 244, xl: 244,}}}  value={[...values.subcategory]}
                        multiple multiline maxRows={6} variant="standard" input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
                         renderValue={(selected) => {
                             //console.log("selected is ==>",selected)
                             return(<Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (<Chip key={value} label={value} />))}</Box>)}} defaultValue={values.subcategory}  >

                               
                                {values.subcategories.filter(arg => arg.parent?._id === values.category).map((arg,i) =>{return(<MenuItem value={arg._id} key={i} >{arg.name}</MenuItem>)})}
      
                </Select>
            </Grid>
            
            <Grid item xs={6} sx={{pt:"0px !important",pl:{xs: "14px !important",sm: "14px !important",md: "14px !important",lg: "14px !important", xl: "14px !important",}}}>
                <TextField onChange={inputHandleChange}  id="filled-helperText" label="Color" name='color' defaultValue={values.color} helperText="Please Enter a Color for Product"   variant="standard"
                sx={{width: {xs: 175,sm: 200,md: 244,lg: 244, xl: 244,}}}/>
            </Grid>


            <Grid item xs={12} sx={{pl:{xs: "14px !important",sm: "14px !important",md: "14px !important",lg: "14px !important", xl: "14px !important",}}}>
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


            


            <Grid item xs={8} sx={{pl:{xs: "14px !important",sm: "14px !important",md: "14px !important",lg: "14px !important", xl: "14px !important",}}}>
                <TextField onChange={inputHandleChange}  id="filled-helperText" label="Description" name='description' defaultValue={values.description}  helperText="Please Enter Description for Product" multiline
          maxRows={10}  sx={{width: {xs: 410,sm: 450,md: 450,lg: 450, xl: 450,}}} />
            </Grid>

           
            <Grid item xs={6} sx={{pl:{xs: "14px !important",sm: "14px !important",md: "14px !important",lg: "14px !important", xl: "14px !important",}}}>
            { editLoading ? <BarLoader speed={2} /> :<Button variant="contained" disabled={!values.title || !values.description || !values.price || !values.quantity || !values.category || !values.subcategory || !values.shipping || !values.images || !values.color} type="submit" sx={{width:"244px"}}>Submit</Button>}
            </Grid>
        </Grid>


          </DialogContentText>
        </DialogContent>                                                                       



        <DialogActions >
          <Button onClick={()=>{setEditProductDialogOpen(false)}} >Close</Button>
          <Button type='submit' autoFocus >
            Yes
          </Button>
        </DialogActions>
</form>
        
</Dialog>
        </>
    )
}

export default ProductEditDialogModule
