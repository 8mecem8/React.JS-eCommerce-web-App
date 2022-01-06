import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux';
import { getCategories,createCategory,removeCategory,updateCategory } from '../../../../UtiFunctions/utiCategory';




/* Material Uİ */

import Fab from '@mui/material/Fab';

import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import CategoryIcon from '@mui/icons-material/Category';
import AddIcon from '@mui/icons-material/Add'
import Divider from '@mui/material/Divider';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import CategoryTwoToneIcon from '@mui/icons-material/CategoryTwoTone';
import Backdrop from '@mui/material/Backdrop';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';





/* Custom Css */
import useStyles from './CategoryModuleStyles'
import BarLoader from '../../../BarLoader/BarLoader';
import DOubbleBubble from '../../../DoubleBubble/DoubleBubble';


import logo from '../../../../logo.png';



{/*------------------------ Snackbar color setting ------------------------*/}
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

{/*------------------------ Snackbar slide effect ------------------------*/}
function TransitionDown(props) {
  return <Slide {...props} direction="down" />;
}









function AAdminCategory({updateComp,setUpdateComp}) 
{

    const sty = useStyles()


{/*------------------------ İf there is logged user ------------------------*/}
    const user = useSelector(state => state.user)



{/*------------------------ Function's main state ------------------------*/}
    const [inputName, setInputName] = useState('');
    const [listOpen, setListOpen] = useState(false);
    const [categoriesList, setCategoriesList] = useState([]);

{/*------------------------ Create Category State ------------------------*/}
    const [Loading,setLoading] = useState(false)


{/*------------------------ Category Delete Dialog State ------------------------*/}
    const [dialogOpen,setDialogOpen] = useState(false)


{/*------------------------ Category Edit State------------------------*/}
    const [categoryColOpen,setCategoryColOpen] = useState(false)    
    const [editCategoryName,setEditCategoryName] = useState({})    


{/*------------------------ Delete Category State ------------------------*/}
    const [delCatLoading,setDelCatLoadingLoading] = useState(false)
    const [delCatName,setDelCatName] = useState('')



{/*------------------------ Filter Category State ------------------------*/}    
    const [filterCategory,setFilterCategory] = useState('')


{/*------------------------ Snackbar states ------------------------*/}
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [snackBarMessage, setSnackBarMessage] = useState("");





{/*------------------------ Create Category list Functions ------------------------*/} 
    const listHandleClick = () => {
    setListOpen(!listOpen);
  };





{/*------------------------ Get all Categories list ------------------------*/} 
useEffect( async()=>
{
   const ListOfCategories = await getCategories()
   setCategoriesList(ListOfCategories.data)
   
},[open,updateComp])




//console.log("categoriesList is ===>",categoriesList)



{/*------------------------ Create Category list Functions ------------------------*/} 

    const formCreateCategory = async (e) => 
    {
        e.preventDefault()
        
        
        setLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 1500));

      

        createCategory(inputName,user.token)
            .then((arg)=>
            {
            setSnackBarMessage(`Category ${arg.data.name} is succesfuly created`)
            setOpen(true)     
            setInputName('')

             //To update other component's fetched list we need to change higher state first true then false tobe able to change it true again
            setUpdateComp(true)
            setUpdateComp(false)
            })
            .catch((error)=>
            {
            setErrorMessage(error?.response.data || error.message)
            setError(true)
            setLoading(false)
            })

        /* console.log(Object.entries(result)) */

        setLoading(false)
    }





{/*------------------------ Snackbars Functions ------------------------*/}

 const ErrorsnackCloseAction = () => 
    {
      setError(false)
    }




    const snackCloseAction = () => 
    {
      setOpen(false)
    }


{/*------------------------ Delete Category Function ------------------------*/}

const deleteCategoryFunc = (arg) => 
{
    setDialogOpen(false)

    removeCategory(arg,user.token)
        .then(async(result)=>
            {   
                setDelCatLoadingLoading(true)

                await new Promise((resolve) => setTimeout(resolve, 1500));

                setSnackBarMessage(`Category ${result.data.name} is Deleted`)
                setOpen(true) 
                //console.log("result is =====>>>",result.data.name)

                setDelCatLoadingLoading(false)

                //To update other component's fetched list we need to change higher state first true then false tobe able to change it true again
                setUpdateComp(true)
                setUpdateComp(false)

            }).catch((error)=>
                    {
                    setErrorMessage(error?.response.data || error.message)
                    setError(true)
                    setDelCatLoadingLoading(false)
                    })

}




{/*------------------------ Edit Category Function ------------------------*/}

const editCategorySubmit = (e) => 
{
    e.preventDefault()

    setDialogOpen(false)
    setCategoryColOpen(false)

    updateCategory(editCategoryName.slug,editCategoryName.name,user.token).then(async(result)=>
            {   
                setDelCatLoadingLoading(true)

                await new Promise((resolve) => setTimeout(resolve, 1500));

                setSnackBarMessage(`Category ${result.data.name} is Updated`)
                setOpen(true) 
                //console.log("result is =====>>>",result.data.name)

                setDelCatLoadingLoading(false)

                //To update other component's fetched list we need to change higher state first true then false tobe able to change it true again
                setUpdateComp(true)
                setUpdateComp(false)

            }).catch((error)=>
                    {
                    setErrorMessage(error?.response.data || error.message)
                    setError(true)
                    setDelCatLoadingLoading(false)
                    })
}



{/*------------------------ Filter Category Functions ------------------------*/}    

const handleFilter = (e) => 
{
    e.preventDefault()
    setFilterCategory(e.target.value.toLowerCase())
}


const filteredCategory = (filterCategory) => (arg) => { return arg.name.toLowerCase().includes(filterCategory) }




    return (
        <>

        





{/*------------------------ Create Category ------------------------*/} 
<List sx={{ width: {xs: 450,sm: 450,md: 450,lg: 450, xl: 450,}, maxWidth: 450,borderRadius: 5 ,  mx: "auto",textAlign: 'center', bgcolor:"rgb(231 252 238 / 87%)" }}  component="nav" 
                                                            aria-labelledby="nested-list-subheader" subheader={<ListSubheader component="div" 
                                                            id="nested-list-subheader" sx={{bgcolor:"rgb(214 239 223 / 87%)",borderRadius: 5}} className={sty.sub}> All Produts should have a Category </ListSubheader>} className={sty.container}>
      
      <ListItemButton onClick={listHandleClick} sx={[{borderRadius: 5},{'&:hover': {backgroundColor: 'rgb(221 252 201 / 87%)',},}]}>

            <ListItemIcon >
            <CategoryIcon  sx={{color:"rgb(254 0 252 / 96%)"}}/>
            </ListItemIcon>

            <ListItemText primary="Create a new Category"  />
            {listOpen ? <ExpandLess /> : <ExpandMore />}

      </ListItemButton>


      <Collapse in={listOpen} timeout="auto" unmountOnExit>
<Divider />

            <List component="div" disablePadding >
                
                  <ListItem sx={{ p: 0, width: '100%',display: 'block' }}  >

              

                        <form  autoComplete="off" onSubmit={formCreateCategory} >

                            <Grid container direction="row" spacing={1}  alignItems="center" sx={{ mt: "10px",}} >     

                                <Grid item xs={7} sx={{ ml: "20px", mb:"10px"}}>
                                        <FormControl  >
                                            <InputLabel htmlFor="component-simple" sx={{mx: 'auto'}}>Category Name</InputLabel > 
                                            <Input id="component-simple" required value={inputName} onChange={(event) => {setInputName(event.target.value)}} fullWidth={true}  />
                                            {/* <FormHelperText id="component-helper-text">To reate a new Category Enter a Category Name</FormHelperText> */}
                                        </FormControl>
                                </Grid>

                                <Grid item xs={1} sx={{ml: 2,}}>
                                        { Loading ? <BarLoader speed={2} /> :  <Fab type='submit' disabled={!inputName} variant="extended" size="medium" color="primary" aria-label="add" style={{textTransform: 'none',}}>
                                         <AddIcon sx={{ m: "auto" }} />
                                            Create
                                        </Fab>}
                                </Grid>


                                </Grid>  
                        </form>

                

                    </ListItem>

            </List>


      </Collapse>
</List>





{/*------------------------ All Categories list------------------------*/} 
 <List 
    sx={{ width: {xs: 450,sm: 450,md: 450,lg: 450, xl: 450,}, 
        maxWidth: 450,borderRadius: 2 ,  mx: "auto",
        textAlign: 'center', mt: 10, bgcolor:"rgb(196 230 255)" }}

    subheader={<ListSubheader component="div"
                            id="nested-list-subheader" 
    sx={{bgcolor:"rgb(157 207 255)",borderRadius: 2}} className={sty.sub}>
        

    <Grid container direction="row" justifyContent="flex-end" alignItems="center">
         
            <Grid item xs={6}  sx={{fontWeight: '700',fontSize: 'subtitle1.fontSize',textAlign: 'left' }}
                    >All Categories List</Grid >

{/*------------------------ Filter Category------------------------*/}                     
            <Grid item xs={3}><TextField onChange={handleFilter} id="standard-basic" label="Filter" variant="standard" sx={{maxWidth:'100px',minWidth:'100px',p:0,mb:1 }} /></Grid >
  
    </Grid>
          </ListSubheader>}>
     
     
     
      {categoriesList.filter(filteredCategory(filterCategory)/* arg => arg.name.includes(filterCategory) */).map((value) => 
      {

          const labelId = `checkbox-list-label-${value}`;
            
        return (
           <>
           
          <ListItem key={value.name}  disablePadding>

            <ListItemButton role={undefined} onClick={snackCloseAction} dense>

                    <ListItemIcon>
                            <CategoryTwoToneIcon sx={{color:"rgb(254 0 252 / 96%)"}} />    
                    </ListItemIcon>

                    <ListItemText id={labelId} primary={` ${value.name }`} />

                    <Tooltip title={`Delete ${value.name} Category`} onClick={ async()=>
                    
                                                                        { 
                                                                           setDelCatName(value.slug)
                                                                           setDialogOpen(true)
                                                                                            
                                                                        }}>
                            <IconButton>
                                <DeleteIcon sx={{color:"rgb(227 104 104 / 96%)"}} />
                            </IconButton>
                    </Tooltip>

                    <Tooltip describeChild title={`Edit ${value.name} Category`} onClick={()=>{
                                                                                                setCategoryColOpen(!categoryColOpen)
                                                                                                setEditCategoryName({name:value.name,slug:value.slug})
                                                                                                }}>
                            <IconButton>
                                <EditIcon sx={{color:"rgb(37 153 120)"}}/>
                            </IconButton>
                    </Tooltip>

            </ListItemButton>


           
          </ListItem>


        
{/*------------------------ Category List Delete Confirn Dialog------------------------*/}

<Dialog
        open={dialogOpen}
        onClose={()=>{setDialogOpen(false)}}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{backgroundColor:"rgb(206 225 255 / 79%)!important",}}
      >

        <DialogTitle id="alert-dialog-title" sx={{backgroundColor:"rgb(249 60 60 / 79%)",color:"white",fontWeight:"600"}}>
          {`Do you want to Delete This Category ?`}
        </DialogTitle>

        <DialogActions sx={{backgroundColor:"rgb(249 60 60 / 79%)",color:"white"}}>
          <Button onClick={()=>{setDialogOpen(false)}} sx={{color:"white"}}>No</Button>
          <Button onClick={()=>{deleteCategoryFunc(delCatName)}} autoFocus sx={{color:"white"}}>
            Yes
          </Button>
        </DialogActions>

        
</Dialog>





{/*------------------------ Category List Edit Screen------------------------*/}

<Dialog
        open={categoryColOpen}
        onClose={()=>{setCategoryColOpen(false)}}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        
      >

        <DialogTitle id="alert-dialog-title" >
          {`You can edit/update Selected Category`}
        </DialogTitle>

        <Divider/>

<form  autoComplete="off" onSubmit={editCategorySubmit} >

         <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <InputLabel htmlFor="component-simple" sx={{mx: 'auto'}}>Edit category name</InputLabel > 
            <Input id="component-simple" required value={editCategoryName.name} onChange={(event) => {setEditCategoryName({...editCategoryName,name:event.target.value})}} fullWidth={true}  />
          </DialogContentText>
        </DialogContent>                                                                       



        <DialogActions >
          <Button onClick={()=>{setCategoryColOpen(false)}} >Close</Button>
          <Button type='submit' autoFocus >
            Yes
          </Button>
        </DialogActions>
</form>
        
</Dialog>

          </>
        );
        
        })}
      
    </List>

{/*------------------------ Category List Delete Loading------------------------*/}
    <Backdrop sx={{ color: '#fff',mt:-0 ,zIndex: (theme) => theme.zIndex.drawer + 1 }} open={delCatLoading}>
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


    
        </>
    )
}

export default AAdminCategory
