import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux';
import { getAllProductsByCounts } from '../../UtiFunctions/utiProduct'







// Material UI
import { CircularProgress} from '@mui/material';



/* Custom Css */
import useStyles from './HomeStyles'
import BarLoader from '../BarLoader/BarLoader';
import DOubbleBubble from '../DoubleBubble/DoubleBubble';


import PageLoader from '../../UtiComponents/page-loader/index'

function Home()
{
    const sty = useStyles()


   

{/*------------------------ İf there is logged user ------------------------*/}
    const user = useSelector(state => state.user)

{/*------------------------ Function's main state ------------------------*/}
    const [HomefetchedProductsList, setHomeFetchedProductsList] = useState([]);

{/*------------------------ Function's main Loading state ------------------------*/}

    const [enterPageLoading, setEnterPageLoading] = useState(false);


{/*------------------------ Fetch All Products as Component Started ------------------------*/}

    useEffect( async()=>
    {
        setEnterPageLoading(true)

      //Get products in 100 list 
      await getAllProductsByCounts(100)
            .then((arg)=>{setHomeFetchedProductsList(arg.data)})
            .catch((err)=>{console.log("error in getting all products",err)})

            await new Promise((resolve) => setTimeout(resolve, 1000));
        setEnterPageLoading(false)
    },[])



console.log(HomefetchedProductsList)




    return (
        <>
        {enterPageLoading ? <PageLoader />  : <p>home</p>}
        </>
    )
}

export default Home
