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
import FavoriteIcon from '@mui/icons-material/Favorite';

import Fab from '@mui/material/Fab';
import AddShoppingCartSharpIcon from '@mui/icons-material/AddShoppingCartSharp';
import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';
import Pagination from '@mui/material/Pagination';






import { getProductsByOrder,getTotalNumberProducts } from '../../../UtiFunctions/utiProduct';
import PageLoader from '../../../UtiComponents/page-loader/index'






function NewArrivals() {

    {/*------------------------ Function's main state ------------------------*/}
    const [HomefetchedProductsListNewArrival, setHomeFetchedProductsListNewArrival] = useState([]);
    const [fetchedTotalNumberforProducts, setfetchedTotalNumberforProducts] = useState(0);


    {/*------------------------ Pagination State ------------------------*/}
    const [page, setPage] = useState(1);


    {/*------------------------ Function's main Loading state ------------------------*/}

    const [enterPageLoading, setEnterPageLoading] = useState(false);

    {/*------------------------ Fetch All Products as Component Started ------------------------*/}
    useEffect( async()=>
    {
        setEnterPageLoading(true)


        await getTotalNumberProducts() 
                .then((arg)=>{setfetchedTotalNumberforProducts(arg.data)})
                .catch((err)=>{console.log("error in getting all products",err)})



        await  getProductsByOrder("createdAt", "desc", page)
                .then((arg)=>{setHomeFetchedProductsListNewArrival(arg.data)})
                .catch((err)=>{console.log("error in getting all products",err)})


            await new Promise((resolve) => setTimeout(resolve, 1000));
        setEnterPageLoading(false)
    },[page])


    

    {/*------------------------ Pagination Function ------------------------*/}
    const handleChange = (event, value) => 
    {
    setPage(value);
    };


    return (
        <>
            {enterPageLoading ? (<PageLoader />)  : 
      (      
          
          <>
          
          <Container maxWidth="xl" sx={{mx: "auto",pt:2}}>

            <p>New arrivals</p>

            <Box
            sx={{display: 'flex', flexWrap: 'wrap', '& :not(style)': {m: 1},mx:"auto" }}>



            {HomefetchedProductsListNewArrival.map(arg =>
                    {
                    
                        //console.log("args  in the main list are ===>",arg)
                        return(

                            <Badge  anchorOrigin={{vertical: 'bottom',horizontal: 'right',}} badgeContent={<Tooltip title="Add to Shopping Cart" placement="top"><Fab size="small" color="primary" aria-label="add" sx={{m:"0 !important",p:"0 !important", fontSize:"5px !important",transform:"translate3d(-29px,-18px,0)"}}><AddShoppingCartSharpIcon /></Fab></Tooltip>} >

                                <Paper elevation={0} sx={{height:328,m:"1.5 !important",p:"0px",":hover": {boxShadow: 6,},}}>
                                <Card sx={{height:208,width:205,p:"20px",m:"0 !important"}}>
                                <Chip  label={`${arg.category.name}`} size="small" color="warning" variant="outlined" sx={{ml:"-15px !important", mt:"-17px !important"}} />
                                <CardMedia
                                component="img"
                                image={arg.images[0].url}
                                alt={arg.images[0].public_id}
                                sx={{pt:"5%",t:0,my:"auto"}}
                                />
                                
                                </Card>

                                <Card sx={{height:140,width:205,p:"0px !important",m:"0 !important"}}>

                                        <CardContent sx={{p:"0px !important",m:"0 !important"}}>
                                            <Typography variant="caption" color="text.secondary" sx={{display:"-webkit-box",letterSpacing: 0,fontWeight: 'light',lineHeight: '-10px important',fontSize:"12px",p:"0px !important",mb:"0 !important",mt:"0 !important",ml:"0.1 !important",mr:"0.1 !important"}}>
                                            { <Link to={`/product/${arg.slug}`} style={{textDecoration:"none",marginLeft:"1px",marginRight:"1px"}}>{arg.title.slice(0,50)}..</Link>} 
                                            </Typography>
                                        </CardContent>

                                        <CardContent sx={{p:"0px !important",m:"0 !important"}}>
                                            <Typography variant="caption" color="text.secondary" sx={{p:"0px !important",mr:"0 !important",mt:"0 !important",mb:"0 !important",display:"-webkit-box",fontFamily:"Helvetica",letterSpacing: 0,fontWeight: 600,color:"#1d252c",lineHeight: '29px important',fontSize:"25px"}}>
                                            {`$${arg.price}`}
                                            </Typography>
                                        </CardContent>


                                        <CardActions disableSpacing sx={{display:"grid",gridTemplateColumns: 'repeat(3, 1fr)',m:"0 !important",p:"0 !important"}}>
                                            <IconButton aria-label="add to favorites" sx={{m:"0 !important",p:"0 !important"}}>
                                            <FavoriteIcon sx={{color:"red",p:"0 !important"}} />
                                            </IconButton>
                     
                                        </CardActions>
                                </Card>


                                </Paper>

                            </Badge>
                        )
                    })}


            
            
        
            </Box>

                    <Box sx={{mx:"auto !important", display:"grid", alignContent:"center", justifyContent:"center",m:2,p:2}}>
                        <Pagination count={Math.round(fetchedTotalNumberforProducts / 3)} page={page} onChange={handleChange}  />
                    </Box>

            </Container>







                    


</>


       ) }
        </>
    )
}

export default NewArrivals
