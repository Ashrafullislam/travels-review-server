const express = require('express');
const app = express();
const cors = require('cors')
const port = process.env.PORT || 5000 ;


// middle wara 
app.use(cors())
app.use(express.json())

const data = require ('./data/service.json')
app.get('/', (req,res ) => {
    res.send('Travels Service Server running ')
})

app.get('/service', (req,res) => {
    res.send(data)
})
// test in the git hub 

app.listen(port, ()=> {
    console.log('Travels service running on port ', port )
})