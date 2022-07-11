//connect to database and store incoming user data

import { connectToDatabase } from "../../../lib/db";
import { hashPassword } from '../../../lib/auth';


// this function will be executed on server
async function handler(req, res) {

    if (req.method !== 'POST') {
        return;
    }

    const data = req.body;// receive data from requested url
    const { email, password } = data;// extract credentials from url

    // check for invalid data
    if (!email || !email.includes('@') || !password || password.trim().lenght < 7) {
        res.status(422).json({ message: 'invalid input - password should be more than 7 characters' });
        return;
    }

    const client = await connectToDatabase();// make connection to mongodb database

    const db = client.db('auth-db');// getting access to the actual concrete database named auth-db . Will create an new database if isnt there one 

    // to check if user already exists
    const existingUser = await db.collection('users').findOne({ email: email });
 

    if (existingUser) {
       
        res.status(422).json({ message:'User already exists !'});
        client.close();
        return;
    }


    const hashedPassword = await hashPassword(password);// encrypting the password using bcrptjs package


    // getting access to the collection
    const result = await db.collection('users').insertOne({
        email: email,
        password: hashedPassword,
    });// creating a new user and storing in collection of that database 

    res.status(201).json({ message: 'created user' });
    client.close();
} export default handler; 