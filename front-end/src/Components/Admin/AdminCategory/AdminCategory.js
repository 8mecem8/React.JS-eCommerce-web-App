import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux';
import { getCategories,createCategory,removeCategory } from '../../../UtiFunctions/utiCategory';



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
import CommentIcon from '@mui/icons-material/Comment';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';






/* Custom Css */
import useStyles from './AdminCategoryStyles'
import BarLoader from '../../BarLoader/BarLoader';






{/*------------------------ Snackbar color setting ------------------------*/}
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

{/*------------------------ Snackbar slide effect ------------------------*/}
function TransitionDown(props) {
  return <Slide {...props} direction="down" />;
}










function AdminCategory() 
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
   
},[open])




console.log("categoriesList is ===>",categoriesList)



{/*------------------------ Create Category list Functions ------------------------*/} 

    const formCreateCategory = async (e) => 
    {
        e.preventDefault()
        
        
        setLoading(true)
        await new Promise((resolve) => setTimeout(resolve, 3000));

      

        createCategory(inputName,user.token)
            .then((arg)=>
            {
            setSnackBarMessage(`Category ${arg.data.name} is succesfuly created`)
            setOpen(true)     

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






    return (
        <>


{/*------------------------ Create Category ------------------------*/} 
<List sx={{ width: {xs: 450,sm: 450,md: 450,lg: 450, xl: 450,}, maxWidth: 450,borderRadius: 5 ,  mx: "auto",textAlign: 'center', mt: 10, bgcolor:"rgb(231 252 238 / 87%)" }}  component="nav" 
                                                            aria-labelledby="nested-list-subheader" subheader={<ListSubheader component="div" 
                                                            id="nested-list-subheader" sx={{bgcolor:"rgb(214 239 223 / 87%)",borderRadius: 5}}> All Produts should have a Category </ListSubheader>} className={sty.container}>
      
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
                                        <FormControl className='zurna' >
                                            <InputLabel htmlFor="component-simple" sx={{mx: 'auto'}}>Category Name</InputLabel > 
                                            <Input id="component-simple" required value={inputName} onChange={(event) => {setInputName(event.target.value)}} fullWidth={true}  />
                                            {/* <FormHelperText id="component-helper-text">To reate a new Category Enter a Category Name</FormHelperText> */}
                                        </FormControl>
                                </Grid>

                                <Grid item xs={1} sx={{ml: 2,}}>
                                        { Loading ? <BarLoader speed={18} /> :  <Fab type='submit' disabled={!inputName} variant="extended" size="medium" color="primary" aria-label="add" style={{textTransform: 'none',}}>
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
 <List sx={{ width: {xs: 450,sm: 450,md: 450,lg: 450, xl: 450,}, maxWidth: 450,borderRadius: 2 ,  mx: "auto",textAlign: 'center', mt: 10, bgcolor:"rgb(231 252 238 / 87%)" }} subheader={<ListSubheader component="div" 
                                                            id="nested-list-subheader" sx={{bgcolor:"rgb(214 239 223 / 87%)",borderRadius: 2}}> All Categories List </ListSubheader>}>
      {categoriesList.map((value) => {

          const labelId = `checkbox-list-label-${value}`;
            
        return (
           <>
           
          <ListItem key={value.name} secondaryAction={<IconButton  edge="end" aria-label="delete"><DeleteForeverIcon /></IconButton>}  disablePadding>

            <ListItemButton role={undefined} onClick={snackCloseAction} dense>

                    <ListItemIcon>
                            <CommentIcon />
                    </ListItemIcon>

                    <ListItemText id={labelId} primary={` ${value.name }`} />

                    <Tooltip title="Delete">
  <IconButton>
    <DeleteIcon />
  </IconButton>
</Tooltip>
<Tooltip describeChild title="Does not add if it already exists.">
  <Button>Add</Button>
</Tooltip>

            </ListItemButton>


           
          </ListItem>
          </>
        );
        
      })}
      
    </List>









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

export default AdminCategory
