import React from 'react'


// Material UI
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';



const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};





export const AverageRatingView = ({p}) => {
    

    //console.log("p is ==>",p)

  if (p && p.ratings) {
    let ratingsArray = p && p.ratings;
    let total = [];
    let length = ratingsArray.length;
    //console.log("length", length);

    ratingsArray.map((r) => total.push(r.star));
    let totalReduced = total.reduce((p, n) => p + n, 0);
    //console.log("totalReduced", totalReduced);

    let highest = length * 5;
    //console.log("highest", highest);

    let result = (totalReduced * 5) / highest;
    
    //console.log("result", result);

    return(
        <>
            <Box sx={{display:"flex", flexDirection:"row", alignItems:"center"}}>
                <Rating name="read-only" size="small" precision={0.5} value={result} readOnly /> <Box sx={{ ml: 2 }}>{result ? `${labels[result]}` : ""}</Box> <Typography variant="overline" sx={{ml:1,color: 'text.secondary'}}>({p.ratings.length})</Typography>
            </Box>
        </>
        
    );
  }

  return(
        <>
            <p>No rating is available</p>
        </>)
};



