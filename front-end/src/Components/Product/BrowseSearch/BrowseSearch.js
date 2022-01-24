import React,{useState,useEffect} from 'react'
import {fetchProductsByFilter, getAllProductsByCounts } from '../../../UtiFunctions/utiProduct';
import { useSelector } from 'react-redux';
import  {Link} from "react-router-dom";





// Material UI
import { CircularProgress} from '@mui/material';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
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







import PageLoader from '../../../UtiComponents/page-loader/index'

import useStyles from './BrowseSearchStyles'
import BarLoader from '../../BarLoader/BarLoader';

import Footer from '../../Footer/Footer';
import { MainRatingView } from '../RatingsView/MainRatingView';




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

    
    {/*------------------------ Redux State ------------------------*/}
    let {search} = useSelector((state)=>{return {...state}})
    const {text} = search

    //İf there is no argument in the search get all products
    let resetText = text.length < 1
    

    {/*------------------------ Main state ------------------------*/}
    const [HomefetchedProductsList, setHomeFetchedProductsList] = useState([]);
    

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


         await  getAllProductsByCounts(50)
                .then((arg)=>{setHomeFetchedProductsList(arg.data)})
                .catch((err)=>{console.log("error in getting all products",err)})



        await new Promise((resolve) => setTimeout(resolve, 1000));

        
        setEnterPageLoading(false)

        return () => {componentMounted = false;}

    },[SnackbarOpen,resetText])


    
    useEffect(async ()=>
    {
        await new Promise((resolve) => setTimeout(resolve, 500));

        fetchProductsByFilter({query: text})
                .then((arg)=>{setHomeFetchedProductsList(arg.data)})
                .catch((err)=>{console.log("error in getting all products",err)})
    },[text])




    return (
        <>
              {enterPageLoading ? (<PageLoader />)  : 
        (

            <>

            
            <Grid container direction="row" spacing={2}>


                    {/* left of the screen */}
                    <Grid item xs={3}>
                        
                            <Grid container direction="column" rowSpacing={1} >
                                    <Grid item xs={6}>
                                       
                                        <Accordion>
                                            <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                            >
                                            <Typography>Accordion 1</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                            <Typography>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                                malesuada lacus ex, sit amet blandit leo lobortis eget.
                                            </Typography>
                                            </AccordionDetails>
                                        </Accordion>





                                    </Grid>
                                    <Grid item xs={6}>
                                       2
                                    </Grid>
                                    <Grid item xs={6}>
                                        3
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
