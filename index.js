const express = require('express');
const app = express();
const cors = require('cors')
const port = process.env.PORT || 5000 ;
const { MongoClient, ServerApiVersion } = require('mongodb');

//mongodb env 
require('dotenv').config()

// middle wara 
app.use(cors())
app.use(express.json())

const services = require ('./data/service.json')
app.get('/', (req,res ) => {
    res.send('Travels Service Server running ')
})
// all services data 
app.get('/service', (req,res) => {
    res.send(services)
})


// mongodb 
/*
username:
password:9IGYdjKsD66dm2FM
 */
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.mznzx9k.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});



// get service details by id 
app.get('/service-details/:id', (req,res)=> {
    const newId = req.params.id ;
    const selectedService = services.find(service => service._id === newId )
    console.log(selectedService)
    res.send(selectedService)
})
 

app.listen(port, ()=> {
    console.log('Travels service running on port ', port )
})