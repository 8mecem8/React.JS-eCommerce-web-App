import React, {useState} from 'react'


/* Material Uİ */
import Grid from '@mui/material/Grid';



import pic from './01.jpg';
import AAdminCategory from './CategoryModule/CategoryModule';
import AdminSubCategory from './SubCategoryModule/SubCategoryModule';








function AdminCategory() 
{

    {/*------------------------ Function's main state ------------------------*/}
    //With the help of this state logic, we have a shared state for 2 components so that when a process happens in one component, this state trigger
    // component to rerender the virtual dom to get newest data and changes
    const [updateComp, setUpdateComp] = useState(false);


    return (
        <>

        <section style={{backgroundImage:`linear-gradient(rgb(255 255 255 / 70%), rgb(25 118 210)),url(${pic})`,backgroundRepeat:"no-repeat",backgroundSize:"100%",width:`${window.innerWidth <= 550 ? "2000px" : "100vw"}`,minHeight:"1500px",maxHeight:"5000px",zIndex:1}}>


        <Grid container sx={{flexDirection:{xs: "column",sm: "column",md: "row",lg: "row", xl: "row",}}}   justifyContent="space-between" alignItems="flex-start" spacing={0}>

            <Grid item xs={4} >
                <AAdminCategory updateComp={updateComp} setUpdateComp={setUpdateComp} />
            </Grid>
            <Grid item xs={6} >
                <AdminSubCategory updateComp={updateComp} setUpdateComp={setUpdateComp} />
            </Grid>
  
        </Grid>



        

    </section>
        </>
    )
}

export default AdminCategory
