import React, {useState,useEffect,useLayoutEffect} from 'react'


import CssBaseline from '@mui/material/CssBaseline';
import {BrowserRouter as Router} from "react-router-dom";
import './App.css';

import Routez from './_Routes/Routez';
import Header from './Components/_Nav-Folders/Header/Header';


/* Material Uİ */
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import { createTheme, ThemeProvider } from '@mui/material/styles';



import {auth} from "./Components/fireBase"
import {useDispatch} from 'react-redux'
import { createUpdateUser } from './UtiFunctions/utiAuth';

const theme = createTheme();





/*------------------------ Snackbar color setting ------------------------*/
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

/*------------------------ Snackbar slide effect ------------------------*/
function TransitionDown(props) {
  return <Slide {...props} direction="down" />;
}







function App() {



 const dispatch = useDispatch()

/*------------------------ Snackbar states ------------------------*/
          const [Loading,setLoading] = useState(false)
          const [open, setOpen] = useState(false);
          const [error, setError] = useState(false);
          const [errorMessage, setErrorMessage] = useState("");



/*------------------------ Firebase get user info and update redux state ------------------------*/

useLayoutEffect(
  ()=>

  {
    //When there is a new render Set page position to 0 at Y axis
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;


    const unsubscribe = auth.onAuthStateChanged(async (user) =>
    {
      if(user){
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

            }).catch((err)=>{
            setErrorMessage(err.message)
            setError(true)
            setLoading(false)})

      }
    })

    unsubscribe()

  },
  
  [])

  



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
    <ThemeProvider theme={theme}>
    <CssBaseline/>



    <Router>
       <Header />
       <Routez/>
    </Router>




     <Snackbar open={error} autoHideDuration={10000} onClose={ErrorsnackCloseAction}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }} TransitionComponent={TransitionDown}>
        <Alert onClose={ErrorsnackCloseAction} severity="error" sx={{ width: '100%' }}>
          {`${errorMessage}`}
          
        </Alert>
      </Snackbar>

    </ThemeProvider>
   </>
  );
}

export default App;
