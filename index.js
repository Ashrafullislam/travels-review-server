const express = require('express');
const app = express();
const cors = require('cors')
const port = process.env.PORT || 5000 ;


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