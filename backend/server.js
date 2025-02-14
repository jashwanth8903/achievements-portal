const exp = require('express')
const app = exp();
require('dotenv').config()
const path = require('path');
const cors = require('cors');
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })
app.use(cors());
// app.use(express.urlencoded({extended: false}))

//deploy react build in this server
app.use(exp.static(path.join(__dirname, '../client/build')))

//import mongo client in server.js
const mongoClient = require('mongodb').MongoClient
//connect to mongo server
mongoClient.connect(process.env.DB_URL)
.then(client=>{
    //get database object
    const fapdb = client.db('fapdb')
    //get collection object
    const facultycollection = fapdb.collection('facultycollection')
    const achievementscollection = fapdb.collection('achievementscollection')
    
    //to set collection object to app so the app can perform operations on the collection
    app.set('facultycollection', facultycollection)
    app.set('achievementscollection', achievementscollection)
    
    console.log('DB connection success')
})
.catch(err=>{
    console.log('DB connection error:', err)
})


//to parse the body of req
app.use(exp.json())

//import API router
const userApp = require('./APIs/user-api')


// if path starts with user-api, send response to userapp
app.use('/user-api',userApp)


app.use((req, res, next)=>{
    res.sendFile(path.join(__dirname, '../client/build/index.html'))
})

//express error handler
app.use((err,req,res,next)=>{
    res.send({message:"error",payload: err.message})
})


const port = process.env.PORT || 5000
app.listen(port, ()=>console.log(`server running at port ${port} successfully!`))