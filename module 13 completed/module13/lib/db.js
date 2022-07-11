// establishing a connection with mongo db

import {MongoClient} from 'mongodb';



export async function connectToDatabase() {


       const client =await MongoClient.connect('mongodb+srv://sanjaykumar:J5xLJ6oTlTCGcDU8@cluster0.qpisc.mongodb.net/?retryWrites=true&w=majority',{useUnifiedTopology: true});
  return client;// return this client when someone calls this function

}