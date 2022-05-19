const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

// middale ware 
app.use(cors())
app.use(express.json())





const uri = `mongodb+srv://${process.env.NAME}:${process.env.PASSWORD}@cluster0.awj3b.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(){
      try{
            await client.connect();
            const taskCollection = client.db("to-do-app").collection("task");


            app.post('/task' , async (req , res)=>{
                  const task = req.body
                  const result = await taskCollection.insertOne(task)
                  res.send({success : 'Your Task Added SuccessFull'})
            })

          

            app.get('/mytask' , async (req , res) =>{
                  const email = req.query.email
                  const query = {email : email}
                  const result = await taskCollection.find(query).toArray()
                  res.send(result)
            })

            // delete 

            app.delete('/task/:id', async ( req , res) =>{
                  const id = req.params.id
                  const query = {_id : ObjectId(id)}
                  const result = await taskCollection.deleteOne(query)
                  res.send({success: "Deleted SuccessFull."})
                  console.log(id);

            })
      }
      finally{

      }
}
run().catch(console.dir)



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`this is to do dap ${port}`)
})