import React, {useState,useEffect} from 'react';
import {useSelector, useDispatch } from 'react-redux'
import {useNavigate,Link} from "react-router-dom";


/* Firebase db */
import {auth} from "../../fireBase"
import {sendPasswordResetEmail } from "firebase/auth";

/* Custom Css */
 import useStyles from './forgotPasswordStyles' 

/* Material Uİ */

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { CircularProgress } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';


import pic1 from "./m1.jpg"

require('dotenv').config()





{/*------------------------ Snackbar color setting ------------------------*/}
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

{/*------------------------ Snackbar slide effect ------------------------*/}
function TransitionDown(props) {
  return <Slide {...props} direction="down" />;
}








function ForgotPassword() {

    const sty = useStyles() 
    let navigate = useNavigate();


/*------------------------ Function's main state ------------------------*/
    const [email,setEmail] = useState("") 



/*------------------------ Snackbar states ------------------------*/
    const [Loading,setLoading] = useState(false) 
    const [open, setOpen] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");


{/*------------------------ İf there is logged user go to homepage ------------------------*/}
    const user = useSelector(state => state.user)

   

    useEffect(()=>
    {
        if(user && user.token) navigate("/")
    },[user])








const inputSubmit = async (e) => 
{

    e.preventDefault();

    setLoading(true)


     const actionCodeSettings = 
      {
        // URL you want to redirect back to. The domain (www.example.com) for this
        // URL must be in the authorized domains list in the Firebase Console.
        url: process.env.REACT_APP_FORGET_PASSWORD_URL,
        // This must be true.
        handleCodeInApp: true
      };

      await sendPasswordResetEmail(auth,email,actionCodeSettings)
      .then(()=>
      {
          
          setOpen(true)
      })
      .catch((error)=>
      {
            setErrorMessage(error.message)
            setError(true)
            setLoading(false)
      })

      
      setLoading(false)
      setTimeout(()=>{setEmail("")},5000)
}




 const snackCloseAction = () => 
    {
      setOpen(false)
    }

const ErrorsnackCloseAction = () => 
    {
      setError(false)
    }




    return (
        <>





{/*------------------------ Forget Password Division ------------------------*/}        
            <Card sx={{ maxWidth: 800, width: {
      xs: 400, 
      sm: 600, 
      md: 700, 
      lg: 700, 
      xl: 800, 
    }, }} className={sty.container}>

        <CardMedia component="img" image={pic1} alt="Register"/>

    <CardContent>

        <Typography gutterBottom variant="h5" component="div">
          Forget Password
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Please Enter your E-mail Address 
        </Typography>


    </CardContent>

<form onSubmit={inputSubmit}>
    <CardContent>

        
            <TextField
        label="Forget Password"
        value={email}
        name="todo"
        onChange={(e)=>{setEmail(e.target.value)}}
       
        fullWidth
      />

  
    </CardContent>


    <CardActions>

        <Button 
        size="small" 
        variant={"outlined"}
        color="primary"
        disabled={!email}
        type="submit"
        size="medium"    
        
        
        >{Loading ? <CircularProgress size={35} /> : 'Submit'}</Button>
        

    </CardActions>
</form>
</Card>





{/*------------------------ Snackbar ------------------------*/}

<Snackbar open={open} autoHideDuration={10000} onClose={snackCloseAction}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} TransitionComponent={TransitionDown}>
        <Alert onClose={snackCloseAction} severity="success" sx={{ width: '100%' }}>
          {`Email is sent to ${email}`}<br/><br/>
          {`Please check your Email for reset link`}
        </Alert>
</Snackbar>


<Snackbar open={error} autoHideDuration={10000} onClose={ErrorsnackCloseAction}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} TransitionComponent={TransitionDown}>
        <Alert onClose={ErrorsnackCloseAction} severity="error" sx={{ width: '100%' }}>
          {`${errorMessage}`}
          
        </Alert>
</Snackbar>




        </>
    )
}

export default ForgotPassword
