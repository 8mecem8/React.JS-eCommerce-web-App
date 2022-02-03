import React,{useState,useEffect} from 'react'
import {fetchProductsByFilter, getAllProductsByCounts, getColors } from '../../../UtiFunctions/utiProduct';
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
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import CategoryIcon from '@mui/icons-material/Category';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import Checkbox from '@mui/material/Checkbox';
import StarBorderPurple500SharpIcon from '@mui/icons-material/StarBorderPurple500Sharp';
import Rating from '@mui/material/Rating';
import Button from '@mui/material/Button';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import FormControlLabel from '@mui/material/FormControlLabel';
import Avatar from '@mui/material/Avatar';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';


import PageLoader from '../../../UtiComponents/page-loader/index'

import useStyles from './BrowseSearchStyles'
import BarLoader from '../../BarLoader/BarLoader';

import Footer from '../../Footer/Footer';
import { MainRatingView } from '../RatingsView/MainRatingView';
import { getCategories } from '../../../UtiFunctions/utiCategory';
import { getSubCategories } from '../../../UtiFunctions/utiSubCategory';




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
    const [subCategoriesList, setSubCategoriesList] = useState([]);
    const [colorsProducts,setColorsProducts] = useState([])

    {/*------------------------ state for Check Box wheather boxes selected or not for initial Main Check Box state ------------------------*/}
    const [zurnastate, setZurnastate] = useState();
    
    {/*------------------------ Select Rating Main state ------------------------*/}
    const [ratingStar, setRatingStar] = useState();

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

        
        //setEnterPageLoading(false)

        return () => {componentMounted = false;}

    },[SnackbarOpen,resetText])


    {/*------------------------ Get all Categories list ------------------------*/} 
    useEffect( async()=>
    {
    const ListOfCategories = await getCategories()
    setCategoriesList(ListOfCategories.data)

    const ListOfSubCategories = await getSubCategories()
    setSubCategoriesList(ListOfSubCategories.data)

    
    const ListOfColors = await getColors()
    setColorsProducts(ListOfColors.data)
    
    },[])




    {/*------------------------ Fetch Products with Query Filter ------------------------*/}
    useEffect(async ()=>
    {
        await new Promise((resolve) => setTimeout(resolve, 500));

        fetchProductsByFilter({query: text})
                .then((arg)=>{setHomeFetchedProductsList(arg.data)})
                .catch((err)=>{console.log("error in getting all products",err)})
    },[text])




    {/*------------------------ Fetch Products with Price Range  ------------------------*/}

     useEffect(async ()=>
    {
        let componentMounted = true;

        dispatch({type: "SEARCH_QUERY",payload: { text: ""},});
        
        setCheckboxstate(zurnastate)
        
        setRatingStar(0)
        

        await new Promise((resolve) => setTimeout(resolve, 1000));

        if(componentMounted)
            {fetchProductsByFilter({price: RangeSlidervalue})
                .then((arg)=>{setHomeFetchedProductsList(arg.data)})
                .catch((err)=>{console.log("error in getting all products",err)})}



        setCheckboxstate([])        
        return () => {componentMounted = false;}

        

    },[activeUseEffect])




    {/*------------------------ Fetch Products with Category ids  ------------------------*/}

    useEffect(async ()=>
    {

        
        dispatch({type: "SEARCH_QUERY",payload: { text: ""},});

        setRangeSlidervalue([0,10000])

        setRatingStar(0)

        

        await new Promise((resolve) => setTimeout(resolve, 500));

        fetchProductsByFilter({category: checkboxstate ? Object.values(checkboxstate).map(arg=> Object.values(arg)[0]) : ""})
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

        setCheckboxstate([])

        setActiveCheckBox(!activeCheckBox)
        
        if(event.target.checked === true)
        {
            setCheckboxstate({
          ...checkboxstate,
          [event.target.name]: {1:event.target.value, 2:event.target.checked}
        });
        
    
        }
      else{ 
        
        let changedState

        const propKey = event.target.name;
        let { [propKey]: propValue, ...rest } = checkboxstate;
        changedState = rest;

       
        setCheckboxstate({
          ...changedState,
          
        })

        
      }
    };

    
    
    {/*------------------------ Create state with false properities to deselect checked boxes for Check box component Function ------------------------*/}
    useEffect(()=>
    {

    const zurna = categoriesList?.map(arg => {return {[arg.name]:{1:arg._id,2:false}}})

    let kurna = {}

    for (let index = 0; index < zurna.length; index++) {
         
        //console.log(Object.entries(zurna[index]).map(arg=>arg[1])[0])
        kurna = {...kurna,
                [Object.keys(zurna[index])[0]]:Object.entries(zurna[index]).map(arg=>arg[1])[0]}
                    
    }

     setZurnastate(kurna)

    
    setEnterPageLoading(false)
    
    },[categoriesList])

    
    
   


    {/*------------------------ Rating filter Function ------------------------*/}
    const HandleRating = async () => 
    {
        

        dispatch({type: "SEARCH_QUERY",payload: { text: ""},});

        setRangeSlidervalue([0,10000])

        setCheckboxstate([])

        setRatingStar(0)

        await fetchProductsByFilter({stars: ratingStar})
                .then((arg)=>{setHomeFetchedProductsList(arg.data)})
                .catch((err)=>{console.log("error in getting all products",err)})

        
        
    }
   
        



    {/*------------------------ Subcategory filter Function ------------------------*/}
    const HandleSubCatFilter = async (ar) =>
    {
        dispatch({type: "SEARCH_QUERY",payload: { text: ""},});

        setRangeSlidervalue([0,10000])

        setCheckboxstate([])

        setRatingStar(0)


         await fetchProductsByFilter({sub: ar})
                .then((arg)=>{setHomeFetchedProductsList(arg.data)})
                .catch((err)=>{console.log("error in getting all products",err)})
    }
  

    

    {/*------------------------ Color filter Function ------------------------*/}

    const HandleColor = async (ar)=>
    {
        dispatch({type: "SEARCH_QUERY",payload: { text: ""},});

        setRangeSlidervalue([0,10000])

        setCheckboxstate([])

        setRatingStar(0)




        await fetchProductsByFilter({color: ar})
                .then((arg)=>{setHomeFetchedProductsList(arg.data)})
                .catch((err)=>{console.log("error in getting all products",err)})
    }





    return (
        <>
              {enterPageLoading  ? (<PageLoader />)  : 
        (

            <>

            
            <Grid container direction="row" spacing={2}>


                    {/* left of the screen */}
                    <Grid item xs={10} sm={11} md={4} lg={3} sx={{mx:"auto",ml:0}}>
                        
                            <Grid container direction="column" rowSpacing={1} sx={{ml:3,mt:3}}>
                                    <Grid item xs={6} md={3} lg={6}>
                                       
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
                                                            onChange={(event, value,)=>{return setRangeSlidervalue(value),setActiveUseEffect(!activeUseEffect)}}
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

                                    <Grid item xs={6} md={3} lg={6}>
                                       
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
                                                                                checked={checkboxstate ? Object.getOwnPropertyDescriptors(checkboxstate)[arg.name]?.value[2] : ""}
                                                                                name={arg.name} 
                                                                                onChange={CheckBoxHandleChange}  
                                                                                value={arg._id}
                                                                                disableRipple={true}
                                                                                />
                                                                                
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

                                    <Grid item xs={6} md={3} lg={6}>
                                        
                                         <Accordion sx={{border: 0,boxShadow: 0,}} >
                                            <AccordionSummary
                                            expandIcon={<ExpandMoreIcon sx={{height:"30px !important",m:0,p:0}} />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                            sx={{maxHeight:"48px !important",m:0,p:0,}}
                                            
                                            >
                                             <StarBorderPurple500SharpIcon sx={{height:"30px !important",fontSize:"medium",m:0,p:0}} />  <Typography sx={{height:"30px !important",m:0,p:0}}>Rating</Typography>
                                            </AccordionSummary>

                                            <AccordionDetails sx={{maxHeight:"48px !important",mb:2,mt:0,p:0,display:"inline-flex"}}>
                                                <Typography >
                                                    
                                                    <Box fullwidth component="fieldset"  sx={{border: 0,boxShadow: 0,flexDirection: 'column',flexWrap: 'no-wrap',display:"-webkit-inline-box"}}>
                                                       
                                                       <Button onClick={HandleRating} onMouseEnter={()=>{setRatingStar(5)}} sx={{p:0,m:0}} variant="text"><Rating name="size-large" defaultValue={5} size="large" readOnly /><Box sx={{ ml: 2 }}>Excellent</Box></Button>
                                                       <Button onClick={HandleRating} onMouseEnter={()=>{setRatingStar(4)}} sx={{p:0,m:0}} variant="text"><Rating name="size-large" defaultValue={4} size="large" readOnly /><Box sx={{ ml: 2 }}>Good</Box></Button>
                                                       <Button onClick={HandleRating} onMouseEnter={()=>{setRatingStar(3)}} sx={{p:0,m:0}} variant="text"><Rating name="size-large" defaultValue={3} size="large" readOnly /><Box sx={{ ml: 2 }}>Fair</Box></Button>
                                                       <Button onClick={HandleRating} onMouseEnter={()=>{setRatingStar(2)}} sx={{p:0,m:0}} variant="text"><Rating name="size-large" defaultValue={2} size="large" readOnly /><Box sx={{ ml: 2 }}>Bad</Box></Button>
                                                       <Button onClick={HandleRating} onMouseEnter={()=>{setRatingStar(1)}} sx={{p:0,m:0}} variant="text"><Rating name="size-large" defaultValue={1} size="large" readOnly /><Box sx={{ ml: 2 }}>Horibble</Box></Button>
                                                    </Box>


                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>


                                    </Grid>

                                    <Grid item xs={6} md={3} lg={6}>
                                        
                                        
                                     <Accordion sx={{border: 0,boxShadow: 0,}} >
                                            <AccordionSummary
                                            expandIcon={<ExpandMoreIcon sx={{height:"30px !important",m:0,p:0}} />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                            sx={{maxHeight:"48px !important",m:0,p:0,}}
                                            
                                            >
                                             <DashboardOutlinedIcon sx={{height:"30px !important",fontSize:"medium",m:0,p:0}} />  <Typography sx={{height:"30px !important",m:0,p:0}}>Subcategory</Typography>
                                            </AccordionSummary>

                                            <AccordionDetails sx={{maxHeight:"48px !important",mb:2,mt:0,p:0,display:"inline-flex"}}>
                                                <Typography>
                                                    
                                                    <Box fullwidth component="fieldset" sx={{border: 0,boxShadow: 0,flexDirection: 'row',flexWrap: 'wrap',display:"-webkit-inline-box"}}>
                                                       
                                                        {subCategoriesList.map((arg,i)=>
                                                                    {

                                                                    return <Chip
                                                                     label={arg.name} 
                                                                     size="small" 
                                                                     /* color="info"  */ 
                                                                     sx={{m:1,bgcolor:"#0288d1",color:"white",":hover": {boxShadow: 6,cursor:"pointer",scale:"1.1",bgcolor:"#1dadfc"}}}
                                                                     onClick={()=>{HandleSubCatFilter(arg)}}
                                                                     />

                                                                    })}

                                                    </Box>


                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>                           


                                    </Grid>

                                    <Grid item xs={6} md={3} lg={6}>
                                        
                                        
                                     <Accordion sx={{border: 0,boxShadow: 0,}} >
                                            <AccordionSummary
                                            expandIcon={<ExpandMoreIcon sx={{height:"30px !important",m:0,p:0}} />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                            sx={{maxHeight:"48px !important",m:0,p:0,}}
                                            
                                            >
                                             <ColorLensOutlinedIcon sx={{height:"30px !important",fontSize:"medium",m:0,p:0}} />  <Typography sx={{height:"30px !important",m:0,p:0}}>Color</Typography>
                                            </AccordionSummary>

                                            <AccordionDetails sx={{maxHeight:"48px !important",mb:2,mt:0,p:0,display:"inline-flex"}}>
                                                <Typography>
                                                    
                                                    <Box fullwidth component="fieldset" sx={{border: 0,boxShadow: 0,flexDirection: 'column',flexWrap: 'no-wrap',display:"-webkit-inline-box"}}>
                                                       
   
                                                                            {colorsProducts.map((arg,i)=>
                                                                                    {
                                                                                        console.log(arg.color.split(' ')[1] === undefined ? arg.color.split(' ')[0] : arg.color.split(' ')[1])
                                                                                        return  <Chip
                                                                                                key={i}                                                            
                                                                                                label={arg.color} 
                                                                                                size="big" 
                                                                                                onClick={()=>{HandleColor(arg.color)}}
                                                                                                sx={{m:1,bgcolor:"#0288d1",color:"white",":hover": {boxShadow: 6,cursor:"pointer",scale:"1.1",bgcolor:"#1dadfc"}}}
                                                                                                avatar={<Avatar sx={{bgcolor:`${arg.color.split(' ')[1] === undefined ? arg.color.split(' ')[0] : arg.color.split(' ')[1]}`}}>#</Avatar>}
                                                                                                /> 
                                                                                                        

                                                                                    })}



                                                    </Box>


                                                </Typography>
                                            </AccordionDetails>
                                        </Accordion>                           


                                    </Grid>


                            </Grid>

                         

                            

                         
 



                    </Grid>


                    {/* right of the screen */}
                    <Grid item xs={9} sm={12} md={8} lg={9} sx={{mx:"auto"}}>


                  
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
