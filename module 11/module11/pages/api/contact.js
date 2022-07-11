import {MongoClient} from 'mongodb';

//Adding the contact API route
// this function is executed only server side
async function handler(req, res) {
    if (req.method === 'POST') {
        const { email, name, message } = req.body;

        if (
            !email ||
            !email.includes('@') ||
            !name ||
            name.trim() === '' ||
            !message ||
            !message.trim() === ''
        ){
            res.status(422).json({message : 'invalid input'});
            console.log("somethin is wrong");
            return;
        }


        //store it in database
        const newMessage = {
            email,
            name,
            message,
        }

        console.log(newMessage);

        let client;
        try{
            client = await MongoClient.connect('mongodb+srv://sanjaykumar:J5xLJ6oTlTCGcDU8@cluster0.qpisc.mongodb.net/?retryWrites=true&w=majority');
        }catch (error){
            res.status(500).json({message : 'could not connect to database'});
            return;
        }

        const db = client.db('my-sitedb');

        try {
            
            const result =  await db.collection('messages').insertOne(newMessage);
            newMessage.id = result.insertedId;
        } catch (error) {
            
            client.close();
            res.status(500).json({message : 'Storing message failed'})
            return;
        }
            client.close();

        res.status(201).json({message :'successfully stored message',message : newMessage})
    }
}
export default handler;