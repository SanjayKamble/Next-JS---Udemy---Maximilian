//changing password with api authentication
//we will extract the old and new password and check whether if its coming from autheticated user
//and deny further actions if its not.request to change password page can be made through 
//third party urls
import {getSession} from 'next-auth/react';
import { hashPassword, verifyPassword } from '../../../lib/auth';
import { connectToDatabase } from '../../../lib/db';
async function handler(req, res) {
    //to check whether if incoming request has right method.post/put/patch method will make sense to change password
    //continue only if method is patch

   
    if (req.method !== 'PATCH') {
        return;
    }

    //to check whether request is coming from authenticated user or not
    //getSession needs that request to check if session token cookie is there in the request. 
    //if it is there getSession will validate and extract that data from cookie and return with session object

    const session = await getSession({ req: req });

    //check if the request is not authenticated or not,
    // here we protect out api route from unauthicated access

    if (!session) {

        res.status(401).json({ message: 'Not authenticated request source' });//authentication is missing
        return;

    }

    //getting user email with old and new password data

    const userEmail = session.user.email;
    const oldPassword = req.body.oldPassword;//this name(oldPassword) should be same as the  name from receiving changePasswordPassword() function
    const newPassword = req.body.newPassword;

    //connecting to db and getting the authenticated user


    const client = await connectToDatabase();
    const userCollection = await client.db('auth-db').collection('users');
    const user = await userCollection.findOne({ email: userEmail });
    if (!user) {
        res.status(404).json({ message: 'User not found !' })
        client.close();
        return;
    }

    
    //check if old password from database and the inputted old password matches

    const currentPassword = user.password;// in form of hashed password
    const passwordAreEqual = await verifyPassword(oldPassword, currentPassword);

    if (!passwordAreEqual) {
        res.status(403).json({ message: '{Password doesnt match' });
        client.close();
        return;
    }

    //now the passwords are equal we will update the password
    const hashedPassword = await hashPassword(newPassword);

    userCollection.updateOne({ email: userEmail }, { $set: { password: hashedPassword } })
    res.status(200).json({ message: 'New password added successfully !' });
    // client.close(); this give error

    //new password 12341234

} export default handler;