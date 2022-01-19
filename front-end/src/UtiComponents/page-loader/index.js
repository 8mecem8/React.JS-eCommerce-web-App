import React from 'react';

// Material UI
import { withStyles } from '@mui/styles';
import { CircularProgress} from '@mui/material';

const styles = theme => ({
    progress: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '90vh',
    },
  });

  const PageLoader = ({ classes }) => {
    return (
      <div className={classes.progress}>
        <CircularProgress size={280}  />
      </div>
    );
  };
  
  export default withStyles(styles)(PageLoader); 





  


/* import { createTheme, ThemeProvider } from '@mui/material/styles';



const theme = createTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: purple[500],
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#11cb5f',
    },
  },
});




export default function PageLoader() {
  return (
    <ThemeProvider theme={theme}>
      <Button>Primary</Button>
      <Button color="secondary">Secondary</Button>
    </ThemeProvider>
  );
}


/* 
import CircularProgress from '@mui/material/CircularProgress';
import { alpha, styled } from '@mui/material/styles';





const CircularP = styled(CircularProgress)(({ theme }) => ({
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      margin: theme.spacing.unit * 5,
  
  
}));

export default function PageLoader() {
  return <CircularP defaultValue={30} />;
} */