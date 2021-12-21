import axios from 'axios'

require('dotenv').config()

/*------------------------ Mongo Db user Create or update ------------------------*/
export const createUpdateUser = async (authtoken) => 
{
  return await axios.post(`${process.env.REACT_APP_API}/auth/create-&-update-user`,{},{headers:{authtoken}})
}


/*------------------------ Mongo Db get current user ------------------------*/
export const currentUser = async (authtoken) => 
{
  return await axios.post(`${process.env.REACT_APP_API}/auth/current-user`,{},{headers:{authtoken}})
}



export const roleBasedRedirect = (exArg,navigate) =>
{
 

  if(exArg.data.role === "admin"){navigate('/admin/dashboard')}
  else navigate('/user/history')
}