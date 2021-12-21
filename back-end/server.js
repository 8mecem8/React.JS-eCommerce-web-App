const express = require('express');
const app = express();
const cors = require('cors')
const path = require('path')
const morgan = require('morgan')
const mongoose = require('mongoose');

require('dotenv').config({path:__dirname+'/.env'})

// İmported Route files-------------------------------------------------------------------------
const authRouter = require('./Routes/Route-Links/authRouter.js');
const userRouter = require('./Routes/Route-Links/userRouter.js');
const categoryRouter = require('./Routes/Route-Links/categoryRouter.js');





// Middlewares-------------------------------------------------------------------------
app.use(cors())
app.use(morgan("dev"))
app.use(express.json({ strict: false }))
//app.use('/uploads', express.static(path.join(__dirname, '/../uploads')))
//app.use(express.static(path.join(__dirname, '/build')))
//app.use(express.static(path.join(__dirname, '/../Front-end')))


app.use("/api", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/", categoryRouter);


//Database------------------------------------------------------------------------------

const mongo = async () => 
{ 
  
  try{
     return await mongoose.connect( process.env.DB_C, {keepAlive: true,useNewUrlParser: true,useUnifiedTopology: true,}, (arg)=>{console.log("mongoose has connected __________ details of connection is ===>",arg)})
    
     }
   catch{ err => {console.error('Error connecting to mongo', err)}}
}
mongo()


// Routes--------------------------------------------------------------------------------


//console.log(process.env.DB_C )

/* app.get('*',(req,res,next)=>
{
    res.sendFile(path.join(__dirname, '/../Front-end/build/index.html'))
}) */
 


/* 
app.get("/api/products", (req, res)=>
{
    //res.send(data.products)
    res.json(data.products)
})


app.get("/api/products/:id", (req, res)=>
{
   const product = data.products.find(at => at._id === req.params.id)

   if(product){res.send(product)}
   else{res.status(404).send({error_message:'Product That You are Looking For Not Found'})}
})


 */






// Error Handler Middlewares-------------------------------------------------------------


const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)


const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({message:'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.json({message: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({message:'invalid token'})
  }



  console.error(error.message)

  next(error)
}

app.use(errorHandler)



//Server settings and Start server---------------------------------------------------------------


const PORT = process.env.PORT || 5000
app.listen(PORT, ()=>{console.log(`Server is running at http://localhost:${PORT}`)})