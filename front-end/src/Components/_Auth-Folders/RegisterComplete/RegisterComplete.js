import React, {useState,useEffect} from 'react'
import {useNavigate} from "react-router-dom";

/* Firebase db */
import {auth} from "../../fireBase"
import { getAuth, sendSignInLinkToEmail,signInWithEmailLink } from "firebase/auth";


/* Custom Css */
import useStyles from './RegisterCompleteStyles'


/* Material Uİ */

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { CircularProgress, formHelperTextClasses } from '@mui/material';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';


import pic1 from "./pic-001-001.png"
import { async } from '@firebase/util';



require('dotenv').config()





/*------------------------ Snackbar color setting ------------------------*/
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

/*------------------------ Snackbar slide effect ------------------------*/
function TransitionDown(props) {
  return <Slide {...props} direction="down" />;
}







const RegisterComplete = () => {

let navigate = useNavigate();

  

/*------------------------ Snackbar states ------------------------*/
          const [Loading,setLoading] = useState(false)
          const [open, setOpen] = useState(false);
          const [error, setError] = useState(false);
          const [errorMessage, setErrorMessage] = useState("");


      const sty = useStyles()
    
/*------------------------ Function's main states ------------------------*/
      const [email,setEmail] = useState("")
      const [password,setPassword] = useState("")





/*------------------------ Taking Email from Localstorage ------------------------*/

useEffect(
  ()=>

  {

    setEmail(window.localStorage.getItem('emailForSignIn'))
    

  },
  [])



  
/*------------------------ User Email verified, password added to user's account ------------------------*/
    const inputSubmit = async (e) => 
    {
      e.preventDefault()
      

      

      try
      {

        if(password.length < 6){ setErrorMessage("Password must be at least 6 characters"); setError(true); return}

        await new Promise((resolve) => setTimeout(resolve, 2000));
        setLoading(true)

        const result = await signInWithEmailLink(auth,email,window.location.href)

        if(result.user.emailVerified)
        {
          window.localStorage.removeItem('emailForSignIn');
          let user = auth.currentUser

           await user.updatePassword(password)

          const idTokenResult = await user.getIdTokenResult()

          

            navigate("/")

            setLoading(false)
        }
        

      } 
      
      catch (error) 
      
      {
        setErrorMessage(error.message)
        setError(true)
        
        console.log(error.name)
      }

      
    }



     const ErrorsnackCloseAction = () => 
    {
      setError(false)
    }


    const snackCloseAction = () => 
    {
      setOpen(false)
    }

    return (
        <>
 
{/*------------------------ Register Division ------------------------*/}
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
          Create account
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Please Enter your E-mail Address to register and use our services
        </Typography>


    </CardContent>

<form onSubmit={inputSubmit}>
    <CardContent>

        
            <TextField
        label="E-mail Address"
        value={email}
        name="todo"
        onChange={(e)=>{setEmail(e.target.value)}}
        disabled
        sx={{ mb:"10px" }}
        fullWidth
      />

       <TextField
        label="Password"
        value={password}
        name="todo"
        onChange={(e)=>{setPassword(e.target.value);}}
        
        fullWidth
      />

  
    </CardContent>


    <CardActions>

        <Button 
        size="small" 
        variant={"outlined"}
        color="primary"
        disabled={!password || !email}
        type="submit"
        size="medium"    
        
        
        >{Loading ? <CircularProgress size={35} /> : 'Submit'}</Button>
        

    </CardActions>
</form>
</Card>


{/*------------------------ Snackbar ------------------------*/}
{/* <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={snackCloseAction}
        message={`Email is sent to ${email}.Please check your Email, Click the link to complete your registration`}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      /> */}

      <Snackbar open={open} autoHideDuration={10000} onClose={snackCloseAction}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }} TransitionComponent={TransitionDown}>
        <Alert onClose={snackCloseAction} severity="success" sx={{ width: '100%' }}>
          {`Email is sent to ${email}`}<br/><br/>
          {`Please check your Email, Click the link to complete your registration`}
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


export default RegisterComplete
