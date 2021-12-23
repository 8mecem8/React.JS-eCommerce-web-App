import React, {useState,useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {useNavigate,Link} from "react-router-dom";
import {createUpdateUser, roleBasedRedirect} from '../../../UtiFunctions/utiAuth'


/* Firebase db */
import {auth, ggleAuthPrvd} from "../../fireBase"
import { signInWithEmailAndPassword,signInWithPopup } from "firebase/auth";


/* Custom Css */
import useStyles from './LoginStyles'


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
import GoogleIcon from '@mui/icons-material/Google';



import pic1 from "./az3.png"



require('dotenv').config()




{/*------------------------ Snackbar color setting ------------------------*/}
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

{/*------------------------ Snackbar slide effect ------------------------*/}
function TransitionDown(props) {
  return <Slide {...props} direction="down" />;
}







const Login = () => {

    const sty = useStyles()
    const dispatch = useDispatch()
    let navigate = useNavigate();



{/*------------------------ Function's main state ------------------------*/}
          const [email,setEmail] = useState("")
          const [password,setPassword] = useState("")



{/*------------------------ Snackbar states ------------------------*/}
          const [Loading,setLoading] = useState(false)
          const [open, setOpen] = useState(false);
          const [error, setError] = useState(false);
          const [errorMessage, setErrorMessage] = useState("");


      
    
{/*------------------------ İf there is logged user ------------------------*/}
    const user = useSelector(state => state.user)

   

    useEffect(()=>
    {
        if(user && user.token) navigate("/") 
    },[user])








    const inputSubmit = async (e) => 
    {
      e.preventDefault()

        
        setLoading(true)

        try {


            await new Promise((resolve) => setTimeout(resolve, 3000));


            const result = await signInWithEmailAndPassword(auth, email, password)

           
            const {user} = result
            const idTokenResult = await user.getIdTokenResult()

            await createUpdateUser(idTokenResult.token).then((arg)=>
            {
              dispatch({
             type:"LOGGED_IN_USER",
             payload:{
                      _id: arg.data._id,
                      email: arg.data.email,
                      name: arg.data.name,
                      role: arg.data.role,
                    token: idTokenResult.token}
                    })

                  
                roleBasedRedirect(arg,navigate)

            }).catch((err)=>{
            setErrorMessage(err.message)
            setError(true)
            setLoading(false)})

            

                    
            

        } catch (error) {
            
            setErrorMessage(error.message)
            setError(true)
            setLoading(false)
        }

      
    }



{/*------------------------ Snackbars Functions ------------------------*/}
 const ErrorsnackCloseAction = () => 
    {
      setError(false)
    }




    const snackCloseAction = () => 
    {
      setOpen(false)
    }


    
    const googleLogin = async () =>
    {
        signInWithPopup(auth,ggleAuthPrvd)
        .then(async(result) => 
        {
            const {user} = result
            const idTokenResult = await user.getIdTokenResult()

            await createUpdateUser(idTokenResult.token).then((arg)=>
            {
              dispatch({
             type:"LOGGED_IN_USER",
             payload:{
                      _id: arg.data._id,
                      email: arg.data.email,
                      name: arg.data.name,
                      role: arg.data.role,
                    token: idTokenResult.token}
                    })


                    roleBasedRedirect(arg,navigate)

            }).catch((err)=>{
            setErrorMessage(err.message)
            setError(true)
            setLoading(false)})




        }).catch((error)=>
        {
            setErrorMessage(error.message)
            setError(true)
            setLoading(false)
        })


        
    }


    return (
        <>
 
{/*------------------------ Login Division ------------------------*/}
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
          Login your account
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Please Enter your E-mail Address and Password to use our services
        </Typography>


    </CardContent>

<form onSubmit={inputSubmit}>
    <CardContent>

        
            <TextField
        label="E-mail Address"
        value={email}
        name="E-mail"
        onChange={(e)=>{setEmail(e.target.value)}}
        sx={{ mb:"10px" }}
       
        fullWidth
      />


      <TextField
        label="Password"
        type="password"
        autoComplete="current-password"
        value={password}
        name="Password"
        onChange={(e)=>{setPassword(e.target.value)}}
        
       
        fullWidth
      />

  
    </CardContent>


    <CardActions>

        <Button 
        size="small" 
        variant={"outlined"}
        color="primary"
        disabled={password.length < 6 || !email}
        type="submit"
        size="medium"  
        sx={{ flexGrow: 2, mr:"40px"}}  
        
        
        >{Loading ? <CircularProgress size={35} /> : 'Login'}</Button>


        <Button 
        
        size="small" 
        variant="contained"
        color="error"
        
        onClick={googleLogin}
            
        sx={{ flexGrow: 1}} 
        startIcon={<GoogleIcon />}
        >{<p>Login with Google</p>}</Button>


        
        

    </CardActions>
    <Link to="/forgot/password" className={sty.link}>Forgot Password</Link>
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


export default Login
