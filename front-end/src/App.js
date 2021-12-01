


import CssBaseline from '@mui/material/CssBaseline';
import {BrowserRouter as Router} from "react-router-dom";
import './App.css';

import Routez from './_Routes/Routez';
import Header from './Components/_Nav-Folders/Header/Header';


function App() {

  
  return (
    <>
    <CssBaseline/>



    <Router>
    <Header />
      <Routez/>
    </Router>

   </>
  );
}

export default App;
