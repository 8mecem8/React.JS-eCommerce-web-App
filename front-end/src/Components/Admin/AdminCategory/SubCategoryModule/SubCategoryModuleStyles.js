import { makeStyles } from '@mui/styles';
import { margin } from '@mui/system';

export default makeStyles((theme) => (
    //console.log("theme is ====>>",theme),
    {
    sub: {
        position:"inherit !important",
    },
    proP:{
        fontSize:"0.8vw",
        marginLeft:"7px"
    },
    container: 
    {
        transform: "translateY(60px)",
    },
    cir:{
        color: theme.palette.common.white,
    },
    input:{
        transform: "translateY(10px)",
    },
    inputOff:{
        /* display:"none !important", */
        fontSize:"15px",
        transform: "translatex(4px)",
    },
    tinyCat:{
        fontSize:"11px",
        transform: "translatey(-10px)",

    }
    
}));