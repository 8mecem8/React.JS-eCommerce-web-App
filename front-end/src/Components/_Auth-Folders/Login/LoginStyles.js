import { makeStyles } from '@mui/styles';





export default makeStyles((theme) => ({


  container: 
  {
    borderRadius: 6,
    margin: '0 auto',
    marginTop: '50px'

  },
  
  button: 
  {
    borderColor: theme.palette.primary.main,
    textTransform: 'none',
    
  },
  buttonG: 
  {
    
    textTransform: 'lowercase' ,
    backgroundColor: 'black',
    
  },
  link: {
        textTransform: "none",
        color:"red",
        textDecoration:"none",
        marginLeft:"0.5vw",
        display:"-webkit-flex",
        justifyContent:"flex-start",
        alignContent:"flex-start",
        transform: "translate(0px, -5px)"

    },
    
}));