import React, {useState,useEffect} from 'react'

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


/* Custom Css */
import useStyles from './UserPasswordStyles'

/* Firebase db */
import {auth} from "../../fireBase"
import { updatePassword } from "firebase/auth";


import pic1 from "./0.jpg"




/*------------------------ Snackbar color setting ------------------------*/
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

/*------------------------ Snackbar slide effect ------------------------*/
function TransitionDown(props) {
  return <Slide {...props} direction="down" />;
}






function UserPassword() {

    const sty = useStyles()



    
/*------------------------ Snackbar states ------------------------*/
          const [Loading,setLoading] = useState(false)
          const [open, setOpen] = useState(false);
          const [error, setError] = useState(false);
          const [errorMessage, setErrorMessage] = useState("");

      
    
/*------------------------ Function's main states ------------------------*/
      const [newPassword,setNewPassword] = useState("")






    /*------------------------ User Email verified, password added to user's account ------------------------*/
    const inputSubmit = async (e) => 
    {
      e.preventDefault()
      

      

      try
      {

        if(newPassword.length < 6){ setErrorMessage("Password must be at least 6 characters"); setError(true); return}

        
        setLoading(true)

        const user = await auth.currentUser;
        
        updatePassword(user, newPassword).then( async() => 
        {
         await new Promise((resolve) => setTimeout(resolve, 2500));
         setOpen(true)
         setLoading(false)
        }).catch((err) => {
            setErrorMessage(err.message)
            setError(true)
            setLoading(false)
        });

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
        <div>
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
          Change Password
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Please Enter your New Password to change your Current Password
        </Typography>


    </CardContent>

<form onSubmit={inputSubmit}>
    <CardContent>

        

       <TextField
        label="Password"
        type="password"
        autoComplete="current-password"
        value={newPassword}
        name="todo"
        onChange={(e)=>{setNewPassword(e.target.value);}}
        
        fullWidth
      />

  
    </CardContent>


    <CardActions>

        <Button 
        size="small" 
        variant={"outlined"}
        color="primary"
        disabled={!newPassword}
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
          {`Your Password Has been updated successfully`}
          
        </Alert>
      </Snackbar>


       <Snackbar open={error} autoHideDuration={10000} onClose={ErrorsnackCloseAction}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} TransitionComponent={TransitionDown}>
        <Alert onClose={ErrorsnackCloseAction} severity="error" sx={{ width: '100%' }}>
          {`${errorMessage}`}
          
        </Alert>
      </Snackbar>
        </div>
    )
}

export default UserPassword
