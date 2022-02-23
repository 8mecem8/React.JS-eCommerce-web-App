import React,{useState,useEffect} from 'react'
import  {Link} from "react-router-dom";


// Material UI
import { CircularProgress} from '@mui/material';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import Fab from '@mui/material/Fab';
import AddShoppingCartSharpIcon from '@mui/icons-material/AddShoppingCartSharp';
import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';







import PageLoader from '../../UtiComponents/page-loader/index'
import { MainRatingView } from '../../Components/Product/RatingsView/MainRatingView';









function RelatedProducts({exArg}) {


    
    {/*------------------------ Function's main state ------------------------*/}
    const [relatedList, setRelatedList] = useState([]);
    


    {/*------------------------ Pagination State ------------------------*/}
    const [page, setPage] = useState(1);


    {/*------------------------ Function's main Loading state ------------------------*/}

    const [enterPageLoading, setEnterPageLoading] = useState(false);

    
    

    {/*------------------------ Pagination Function ------------------------*/}
    const handleChange = (event, value) => 
    {
    setPage(value);
    };


    useEffect(()=>
    {
        setRelatedList(exArg)

    },[])









    return (
        <>
            

            {enterPageLoading ? (<PageLoader />)  : 
        (

                   <Container maxWidth="xl" sx={{mx: "auto",pt:2}}>

            <p>Related Products</p>

            <Box
            sx={{display: 'flex', flexWrap: 'wrap', '& :not(style)': {m: 1},mx:"auto" }}>
                
            

            {relatedList.map(arg =>
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







        )}




        </>
    )
}

export default RelatedProducts
