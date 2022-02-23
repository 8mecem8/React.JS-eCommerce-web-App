import { makeStyles } from '@mui/styles';
import { margin } from '@mui/system';

export default makeStyles((theme) => (
    //console.log("theme is ====>>",theme),
    {
    sub: {
        position:"inherit !important",
    },
    mGrid:{
        transform: "translateY(80px)",
    },
    hide:{
        display: 'none !important',
    },
    mousePoint:{
        cursor:"pointer",
        zIndex: "9999"
    },
    
    
}));