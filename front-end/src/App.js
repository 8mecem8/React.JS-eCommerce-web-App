import React,{useEffect} from 'react';


import CssBaseline from '@mui/material/CssBaseline';
import {BrowserRouter as Router} from "react-router-dom";
import './App.css';

import Routez from './_Routes/Routez';
import Header from './Components/_Nav-Folders/Header/Header';



import { createTheme, ThemeProvider } from '@mui/material/styles';

import {auth} from "./Components/fireBase"
import {useDispatch} from 'react-redux'

const theme = createTheme();



function App() {

 const dispatch = useDispatch()

/*------------------------ Firebase get user info and update redux state ------------------------*/

useEffect(
  ()=>

  {
    const unsubscribe = auth.onAuthStateChanged(async (user) =>
    {
      if(user){
        const idTorenResult = await user.getIdTokenResult()

        dispatch({
          type:"LOGGED_IN_USER",
          payload:{email: user.email,
                    token: idTorenResult.token}
        })
      }
    })


  },
  
  [])

  
  return (
    <>
    <ThemeProvider theme={theme}>
    <CssBaseline/>



    <Router>
       <Header />
       <Routez/>
    </Router>



    </ThemeProvider>
   </>
  );
}

export default App;
