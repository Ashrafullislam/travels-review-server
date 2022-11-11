const express = require('express');
const app = express();
const cors = require('cors')
const port = process.env.PORT || 5000 ;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

//mongodb env 
require('dotenv').config()

// middle wara 
app.use(cors())
app.use(express.json())


app.get('/', (req,res ) => {
    res.send('Travels Service Server running ')
})



// mongodb 

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.mznzx9k.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try{
      const serviceCollection = client.db("travelsZoone").collection('service')
      const reviewCollection = client.db("travelsZoone").collection('review')
      app.get('/services', async(req,res) => {
        const query = {}
        const cursor = serviceCollection.find(query)
        const services = await cursor.limit(3).toArray()
        res.send(services)
      })
      app.get('/allservices', async(req,res) => {
        const query = {}
        const cursor = serviceCollection.find(query)
        const services = await cursor.toArray()
        res.send(services)
      })
    
      // get service details by id 
     app.get('/service/:id', async(req,res) => {
       const  id = req.params.id;
       const query = {_id:ObjectId(id)};
       const service = await serviceCollection.findOne(query); 
       res.send(service)
     })

     // add review with service info 
     app.get('/service_review/:id', async(req,res) => {
      const  id = req.params.id;
      const query = {_id:ObjectId(id)};
      const service = await serviceCollection.findOne(query); 
      res.send(service)
    })

      // review api create insert data mongodb
      app.post('/reviews', async(req,res) => {
      const review = req.body ;
      const reviews = await reviewCollection.insertOne(review)
      res.send(reviews) 
      })
     
      // delete review 
      app.delete('/reviews/:id', async(req, res)=>{
        const id = req.params.id;
        const query = {_id: ObjectId(id)};
        const result = await reviewCollection.deleteOne(query)
        res.send(result)
    })

     // get review from data base 
     app.get('/reviews', async(req,res) => {
        const filter = {}
        const cursor = reviewCollection.find(filter)
        const reviews = await cursor.toArray()
        res.send(reviews)
     })

    }
    
    finally{

    }
}
run().catch(console.dir);


app.listen(port, ()=> {
    console.log('Travels service running on port ', port )
})