import React,{useState,useEffect} from 'react'
import {fetchProductsByFilter, getAllProductsByCounts } from '../../../UtiFunctions/utiProduct';
import { useSelector , useDispatch } from 'react-redux';
import  {Link} from "react-router-dom";
import './BrowseSearch.css'




// Material UI
import { CircularProgress} from '@mui/material';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Fab from '@mui/material/Fab';
import AddShoppingCartSharpIcon from '@mui/icons-material/AddShoppingCartSharp';
import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CategoryIcon from '@mui/icons-material/Category';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';







import PageLoader from '../../../UtiComponents/page-loader/index'

import useStyles from './BrowseSearchStyles'
import BarLoader from '../../BarLoader/BarLoader';

import Footer from '../../Footer/Footer';
import { MainRatingView } from '../RatingsView/MainRatingView';
import { getCategories } from '../../../UtiFunctions/utiCategory';




{/*------------------------ Snackbar color setting ------------------------*/}
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

{/*------------------------ Snackbar slide effect ------------------------*/}
function TransitionDown(props) {
  return <Slide {...props} direction="down" />;
}





function BrowseSearch() {

    const sty = useStyles();

    const dispatch = useDispatch();

    {/*------------------------ Redux State ------------------------*/}
    let {search} = useSelector((state)=>{return {...state}})
    const {text} = search

    //İf there is no argument in the search get all products
    let resetText = text.length < 1
    

    {/*------------------------ Main state ------------------------*/}
    const [HomefetchedProductsList, setHomeFetchedProductsList] = useState([]);
    const [categoriesList, setCategoriesList] = useState([]);

    {/*------------------------ Range Slider Main state ------------------------*/}
    const [RangeSlidervalue, setRangeSlidervalue] = useState([0, 10000]);

    {/*------------------------ Check Box Main state ------------------------*/}
    const [checkboxstate, setCheckboxstate] = useState();

    {/*------------------------ Check Box Main state ------------------------*/}
    const [activeUseEffect, setActiveUseEffect] = useState(false);

     {/*------------------------ Check Box activate ------------------------*/}
    const [activeCheckBox, setActiveCheckBox] = useState(false);

    {/*------------------------ Function's main Loading state ------------------------*/}
    const [enterPageLoading, setEnterPageLoading] = useState(false);


    {/*------------------------ Snackbar states ------------------------*/}
    const [SnackbarOpen, setSnackbarOpen] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [snackBarMessage, setSnackBarMessage] = useState("");

    {/*------------------------ Pagination State ------------------------*/}
    const [page, setPage] = useState(1);


    {/*------------------------ Fetch All Products ------------------------*/}

    useEffect( async()=>
    {
        let componentMounted = true;

        setEnterPageLoading(true)


         if(componentMounted)
            {await  getAllProductsByCounts(50)
                .then((arg)=>{setHomeFetchedProductsList(arg.data)})
                .catch((err)=>{console.log("error in getting all products",err)})}



        await new Promise((resolve) => setTimeout(resolve, 1000));

        
        setEnterPageLoading(false)

        return () => {componentMounted = false;}

    },[SnackbarOpen,resetText])


    {/*------------------------ Get all Categories list ------------------------*/} 
    useEffect( async()=>
    {
    const ListOfCategories = await getCategories()
    setCategoriesList(ListOfCategories.data)
    
    },[])



    {/*------------------------ Fetch All Products with Filter ------------------------*/}
    useEffect(async ()=>
    {
        await new Promise((resolve) => setTimeout(resolve, 500));

        fetchProductsByFilter({query: text})
                .then((arg)=>{setHomeFetchedProductsList(arg.data)})
                .catch((err)=>{console.log("error in getting all products",err)})
    },[text])


     useEffect(async ()=>
    {
        let componentMounted = true;

        dispatch({type: "SEARCH_QUERY",payload: { text: ""},});
        
        setCheckboxstate([])

        await new Promise((resolve) => setTimeout(resolve, 1000));

        if(componentMounted)
            {fetchProductsByFilter({price: RangeSlidervalue})
                .then((arg)=>{setHomeFetchedProductsList(arg.data)})
                .catch((err)=>{console.log("error in getting all products",err)})}


        return () => {componentMounted = false;}

    },[activeUseEffect])



    useEffect(async ()=>
    {

        
        dispatch({type: "SEARCH_QUERY",payload: { text: ""},});

        setRangeSlidervalue([0,10000])

        await new Promise((resolve) => setTimeout(resolve, 500));

        fetchProductsByFilter({category: checkboxstate ? Object.values(checkboxstate) : ""})
                .then((arg)=>{setHomeFetchedProductsList(arg.data)})
                .catch((err)=>{console.log("error in getting all products",err)})
    },[activeCheckBox])
 



    


    {/*------------------------ Range Slider Function ------------------------*/}
    function valuetext(RangeSlidervalue) 
    {
        return `${RangeSlidervalue}°C`;
    }



    function valueLabelFormat(value) 
    {
    
    return `${value} $`;
    }


    {/*------------------------ Fetch All Products ------------------------*/}
    const marks = [
    {
        value: 0,
        label: '0$',
    },
    {
        value: 10000,
        label: '10.000$',
    },
    ];




    {/*------------------------ CheckBox Function ------------------------*/}
    const CheckBoxHandleChange = async (event) => 
    {
        setActiveCheckBox(!activeCheckBox)
        
        if(event.target.checked === true)
        {
            setCheckboxstate({
          ...checkboxstate,
          [event.target.name]: [event.target.value, event.target.checked]
        });
        
    
        }
      else{ 
        
        let changedState

        const propKey = event.target.name;
        const { [propKey]: propValue, ...rest } = checkboxstate;
        changedState = rest;

        

        setCheckboxstate({
          ...changedState
        })

        
      }
    };

  
    console.log("changedState", checkboxstate !== undefined ? checkboxstate["Samsung"] : "" )
    

    return (
        <>
              {enterPageLoading ? (<PageLoader />)  : 
        (

            <>

            
            <Grid container direction="row" spacing={2}>


                    {/* left of the screen */}
                    <Grid item xs={3}>
                        
                            <Grid container direction="column" rowSpacing={1} sx={{ml:3,mt:3}}>
                                    <Grid item xs={6}>
                                       
                                        <Accordion sx={{border: 0,boxShadow: 0,}} >
                                            <AccordionSummary
                                            expandIcon={<ExpandMoreIcon sx={{height:"30px !important",m:0,p:0}} />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                            sx={{maxHeight:"48px !important",m:0,p:0,}}
                                            
                                            >
                                             <AttachMoneyIcon sx={{height:"30px !important",fontSize:"medium",m:0,p:0}} />  <Typography sx={{height:"30px !important",m:0,p:0}}>Price</Typography>
                                            </AccordionSummary>

                                            <AccordionDetails sx={{maxHeight:"48px !important",mb:2,mt:0,p:0,}}>
                                                <Typography>
                                                    
                                                    <Box fullwidth>
                                                       
                                                        <Slider
                                                            getAriaLabel={() => 'Temperature range'}
                                                            value={RangeSlidervalue}
                                                            onChange={(event, value)=>{return setRangeSlidervalue(value),setActiveUseEffect(!activeUseEffect)}}
                                                            valueLabelDisplay="auto"
                                                            getAriaValueText={valuetext}
                                                            valueLabelFormat={valueLabelFormat}
                                                            marks={marks}
                                                            min={0}
                                                            step={100}
                                                            max={10000}
                                                            sx={{m:0,p:0}}
                                                        />
                                                    </Box>


                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
                                    </Grid>

                                    <Grid item xs={6}>
                                       
                                        <Accordion sx={{border: 0,boxShadow: 0,}} >
                                            <AccordionSummary
                                            expandIcon={<ExpandMoreIcon sx={{height:"30px !important",m:0,p:0}} />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                            sx={{maxHeight:"48px !important",m:0,p:0,}}
                                            
                                            >
                                             <CategoryIcon sx={{height:"30px !important",fontSize:"medium",m:0,p:0}} />  <Typography sx={{height:"30px !important",ml:0.7,p:0}}>Category</Typography>
                                            </AccordionSummary>

                                            <AccordionDetails sx={{maxHeight:"48px !important",mb:2,mt:0,p:0,display:"inline-flex"}}>
                                                <Typography>
                                                    
                                                    <Box  sx={{ display: 'flex', }}>

                                                        <FormControl sx={{ m: 0,}} component="fieldset" variant="standard">

                                                            

                                                            <FormGroup sx={{display: 'flex',flexDirection: 'row',flexWrap: 'wrap'}}>

                                                                {categoriesList.map(arg =>
                                                                    {
                                                                            

                                                                        return(
                                                                            <FormControlLabel
                                                                                control={
                                                                                <Checkbox 
                                                                                 /* checked={(event)=>{ return console.log(checkboxstate[event.target.name])}} */ 
                                                                                onChange={CheckBoxHandleChange} value={arg._id} name={arg.name} />
                                                                                }
                                                                                label={arg.name}
                                                                            />


                                                                        )
                                                                    })}
                                                                
                                                    
                                                            </FormGroup>

                                            
                                                        </FormControl>
                                                    
                                                    </Box>
                                                   

                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>
 
                                    </Grid>

                                    <Grid item xs={6}>
                                        
                                         <Accordion sx={{border: 0,boxShadow: 0,}} >
                                            <AccordionSummary
                                            expandIcon={<ExpandMoreIcon sx={{height:"30px !important",m:0,p:0}} />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                            sx={{maxHeight:"48px !important",m:0,p:0,}}
                                            
                                            >
                                             <AttachMoneyIcon sx={{height:"30px !important",fontSize:"medium",m:0,p:0}} />  <Typography sx={{height:"30px !important",m:0,p:0}}>Price</Typography>
                                            </AccordionSummary>

                                            <AccordionDetails sx={{maxHeight:"48px !important",mb:2,mt:0,p:0,}}>
                                                <Typography>
                                                    
                                                    <Box fullwidth>
                                                       
                                                        <Slider
                                                            getAriaLabel={() => 'Temperature range'}
                                                            value={RangeSlidervalue}
                                                            onChange={(event, value)=>{setRangeSlidervalue(value)}}
                                                            valueLabelDisplay="auto"
                                                            getAriaValueText={valuetext}
                                                            valueLabelFormat={valueLabelFormat}
                                                            marks={marks}
                                                            min={0}
                                                            step={100}
                                                            max={10000}
                                                            sx={{m:0,p:0}}
                                                        />
                                                    </Box>


                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>













                                    </Grid>
                                    <Grid item xs={6}>
                                        4
                                    </Grid>
                            </Grid>

                         

                            

                         
 



                    </Grid>


                    {/* right of the screen */}
                    <Grid item xs={9}>


                  
                     <Container maxWidth="xl" sx={{mx: "auto",pt:2}}>


            <Box
            sx={{display: 'flex', flexWrap: 'wrap', '& :not(style)': {m: 1},mx:"auto" }}>
                
            

            {HomefetchedProductsList?.map(arg =>
                    {
                    
                        
                        return(
                            
                            <Badge  anchorOrigin={{vertical: 'bottom',horizontal: 'right',}} badgeContent={<Tooltip title="Add to Shopping Cart" placement="top"><Fab size="small" color="primary" aria-label="add" sx={{m:"0 !important",p:"0 !important", fontSize:"5px !important",transform:"translate3d(-29px,-28px,0)"}}><AddShoppingCartSharpIcon /></Fab></Tooltip>} >
                                
                                <Paper elevation={0} sx={{height:348,minWidth:228,m:"1.5 !important",p:"0px",":hover": {boxShadow: 6,},}}>


                                        <Card sx={{height:208,width:250,p:"20px",m:"0 !important"}}>
                                                <Chip  label={`${arg.category.name}`} size="small" color="warning" variant="outlined" sx={{ml:"-15px !important", mt:"-17px !important"}} />
                                                
                                                <CardMedia
                                                component="img"
                                                image={arg.images[0].url}
                                                alt={arg.images[0].public_id}
                                                sx={{pt:"5%",t:0,my:"auto"}}
                                                />
                                        
                                        </Card>

                                        <Card sx={{height:140,width:250,p:"0px !important",m:"0 !important"}}>

                                                <CardContent sx={{p:"0px !important",m:"0 !important"}}>
                                                    <Typography variant="caption" color="text.secondary" sx={{display:"-webkit-box",letterSpacing: 0,fontWeight: 'light',lineHeight: '-10px important',fontSize:"12px",p:"0px !important",mb:"0 !important",mt:"2 !important",ml:"0.1 !important",mr:"0.1 !important"}}>
                                                    { <Link to={`/product/${arg.slug}`} style={{textDecoration:"none",marginLeft:"1px",marginRight:"1px"}}>{arg.title.slice(0,62)}..</Link>} 
                                                    </Typography>
                                                </CardContent>

                                                <CardContent sx={{p:"0px !important",m:"0 !important"}}>
                                                    <Typography variant="caption" color="text.secondary" sx={{p:"0px !important",mr:"0 !important",mt:"3 !important",mb:"0 !important",display:"-webkit-box",fontFamily:"Helvetica",letterSpacing: 0,fontWeight: 600,color:"#1d252c",lineHeight: '29px important',fontSize:"25px"}}>
                                                    {`$${arg.price}`}
                                                    </Typography>
                                                    
                                                </CardContent>

                                                
                                                    

                                                <CardActions disableSpacing sx={{display:"grid",gridTemplateColumns: 'repeat(3, 1fr)',m:"0 !important",p:"0 !important"}}>
                                                    <IconButton aria-label="rating" sx={{m:"0 !important",p:"0 !important",transform:"translate3d(-12px,-10px,0)"}}>
                                                    
                                                        <MainRatingView p={arg} />
                                                    </IconButton>
                                                    
                                                </CardActions>
                                        </Card>

                                
                                </Paper>

                            </Badge>
                        )
                    })}


            
            
        
            </Box>

                       

                        <Box sx={{ bgcolor: '#ffffff00', height: '50px', width:"100vw",mx:"auto",overflowX:"hidden" }} />

            </Container>



                        
                    </Grid>
            </Grid>

            <Divider variant="middle" sx={{mx:12}}/>

           


            {/* Footer Component */}
            <Footer/>
 


            {/*------------------------ Snackbar ------------------------*/}
        <Snackbar open={SnackbarOpen} autoHideDuration={10000} onClose={()=>{setSnackbarOpen(!SnackbarOpen)}}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} TransitionComponent={TransitionDown}>
            <Alert onClose={()=>{setSnackbarOpen(!SnackbarOpen)}} severity="success" sx={{ width: '100%' }}>
                {snackBarMessage}
            </Alert>
        </Snackbar>



         <Snackbar open={error} autoHideDuration={10000} onClose={()=>{setError(false)}}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} TransitionComponent={TransitionDown}>

            <Alert onClose={()=>{setError(false)}} severity="error" sx={{ width: '100%' }}>
                {`${errorMessage}`}
            </Alert>

         </Snackbar>
















            </>
        )}
        </>
    )
}

export default BrowseSearch
