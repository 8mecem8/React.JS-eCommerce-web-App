import React from "react";
import { useSelector, useDispatch } from "react-redux";
import  {useNavigate} from "react-router-dom";


// Material UI
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';


// Custom Style
import useStyles from './SearchProductsStyles'



const Search = () => {

  const sty = useStyles();
  const dispatch = useDispatch();
  const { search } = useSelector((state) => ({ ...state }));
  const { text } = search;

  const navigate = useNavigate()

  const handleChange = (e) => {
    dispatch({
      type: "SEARCH_QUERY",
      payload: { text: e.target.value },
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?${text}`);
  };

  return (


        <form onSubmit={handleSubmit} style={{width:"100%",backgroundColor:"transparent",borderColor:"transparent",}}>

                  <TextField
                  id="input-with-icon-Search-for-Product-details"
                  placeholder="Search..."
                  onChange={handleChange}
                  sx={{borderRadius: '50% !important',width:"100%","& .css-1q6at85-MuiInputBase-root-MuiOutlinedInput-root ":{borderRadius:"18px",height:"49px"}}}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start" sx={{border:"none"}}>
                        <SearchIcon />
                      </InputAdornment>
                                     )}}
                 />

        </form>




  );
};

export default Search;



    {/* <form className="form-inline my-2 my-lg-0" onSubmit={handleSubmit}>
      <input
        onChange={handleChange}
        type="search"
        value={text}
        className="form-control mr-sm-2"
        placeholder="Search"
      />
      <SearchOutlined onClick={handleSubmit} style={{ cursor: "pointer" }} />
    </form> */}


   /*  <Box sx={{ display: 'flex', width:"100%",flexWrap: 'wrap',minWidth:"150px !important", mr:2,ml:2,mt:"0px !important",bgcolor:"white",borderColor:"transparent",border:"none" }}> */
    