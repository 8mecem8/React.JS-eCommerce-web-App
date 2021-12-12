import * as React from 'react';

import { Link } from 'react-router-dom';




// Material UI
/* import { withStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const styles = theme => ({
  wrapper: {
    marginTop: 85,
  },
  logo: {
    paddingBottom: 20,
    height: 100,
  },
  sadFaceIcon: {
    maxHeight: 400,
    marginTop: theme.margin,
  },
  button: {
    color: '#fff',
    marginTop: theme.margin * 2,
    marginBottom: theme.margin,
  },
});

const NoMatchPage = ({ classes }) => (
  <div className={`container ${classes.wrapper}`}>
    <div className="row">
      <div className="col-md-8">
        <img className={classes.logo} src="/dist/images/logo.svg" alt="careem-logo" />
        <Typography variant="display3" gutterBottom>
          404
        </Typography>
        <Typography variant="title" gutterBottom color="textSecondary">
          This is an error.
        </Typography>
        <Typography variant="body1" gutterBottom color="textSecondary">
          The requested URL /hosting was not found on this server.
        </Typography>
        <Typography variant="body1" gutterBottom color="textSecondary">
          This is all we know.
        </Typography>

        <Button
          component={Link}
          to="/"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Go Back
        </Button>
      </div>
      <div className="col-md-4">
        <img src="/dist/images/sad-face.svg" className={classes.sadFaceIcon} alt="sad-face" />
      </div>
    </div>
  </div>
);


export default withStyles(styles)(NoMatchPage);
 */





// Material UI
import { makeStyles } from '@mui/styles';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import zurna from "../UtiFiles/sad-face.svg"

const theme = createTheme();

const styles = makeStyles((theme) => ({
  wrapper: {
    
    display:"flex",
    marginLeft:"6vw",
    marginTop:"8vw",
    justifyContent:"center"
    
  },
  logo: {
    paddingBottom: 20,
    height: 100,
  },
  sadFaceIcon: {
    maxHeight: 300,
   
  },
  button: {
    color: '#fff',
    marginTop: theme.margin * 2,
  
  },
}));

const NoMatchPage = (props) => {

    const classes = styles();
  
  return(

    <ThemeProvider theme={theme}>


  <div className={`container ${classes.wrapper}`}>
    <div className="row">
      <div className="col-md-8">
        
        <Typography variant="h3" >
          404
        </Typography>
        <Typography variant="title"  color="textSecondary" gutterBottom={true}>
          This is an error.
        </Typography>
        <br />
        <br />
        <Typography variant="body1" gutterBottom color="textSecondary">
          The requested URL /hosting was not found on this server.
        </Typography>
        <Typography variant="body1" gutterBottom color="textSecondary">
          This is all we know.
        </Typography>

        <Button
          component={Link}
          to="/"
          variant="contained"
          color="primary"
          className={classes.button}
        >
          Go Back
        </Button>
      </div>
      <div className="col-md-4">
        <img src={zurna} className={classes.sadFaceIcon} alt="sad-face" />
      </div>
    </div>
  </div>
  </ThemeProvider>
)};



export default NoMatchPage;