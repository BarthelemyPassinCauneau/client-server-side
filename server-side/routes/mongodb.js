const { MongoClient } = require("mongodb");
const fs = require("fs")

//Add the URI in a new mongodb.config file
const uri = fs.readFileSync("./mongodb.config", "utf-8")
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const database = client.db('sample_mflix');
    const collection = database.collection('movies');
    // Query for a movie that has the title 'Back to the Future'
    const query = { title: 'Back to the Future' };
    const movie = await collection.findOne(query);
    console.log(movie);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);