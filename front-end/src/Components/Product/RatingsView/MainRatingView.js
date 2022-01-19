import React from 'react'
import './MainRating.css'

// Material UI
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';




export const MainRatingView = ({p}) => {
    

    console.log("p is ==>",p)

  if (p && p.ratings) {
    let ratingsArray = p && p.ratings;
    let total = [];
    let length = ratingsArray.length;
    console.log("length", length);

    ratingsArray.map((r) => total.push(r.star));
    let totalReduced = total.reduce((p, n) => p + n, 0);
    console.log("totalReduced", totalReduced);

    let highest = length * 5;
    console.log("highest", highest);

    let result = (totalReduced * 5) / highest;
    
    console.log("result", result);

    return(
        
            <Box sx={{display:"flex", flexDirection:"row", alignItems:"center",justifyContent:"center", m:0,p:0,}}>
                <Rating name="read-only" size="small" precision={1} value={result} readOnly sx={{ m:0,p:0,'& .css-34he1w-MuiRating-decimal': {m:"-2px !important",p:0} }} /> <Typography variant="overline" sx={{m:0,color: 'text.secondary',transform:"translate3d(-12px,0,0)"}}>({p.ratings.length})</Typography>
            </Box>
        
        
    );
  }

  return(
        
            <Box sx={{display:"flex", flexDirection:"row", alignItems:"center",justifyContent:"center", m:0,p:0,}}>
              <Typography variant="overline" sx={{m:0,color: 'text.secondary',transform:"translate3d(-12px,0,0)"}}>No rating is available</Typography>
            </Box>
        )
};



