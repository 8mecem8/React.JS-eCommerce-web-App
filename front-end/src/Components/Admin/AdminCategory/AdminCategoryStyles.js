import { makeStyles } from '@mui/styles';
import { margin } from '@mui/system';

export default makeStyles((theme) => (
    //console.log("theme is ====>>",theme),
    {
    link: {
        textTransform: "none",
        color:"white",
        textDecoration:"none",
    },
    proP:{
        fontSize:"0.8vw",
        marginLeft:"7px"
    },
    container: 
    {
   
    borderRadius: 6,
    margin: '0 auto',
    marginTop: '50px'

    },
    cir:{
        color: theme.palette.common.white,
    }
    
}));