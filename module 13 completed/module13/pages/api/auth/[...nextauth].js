import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { verifyPassword } from "../../../lib/auth";
import { connectToDatabase } from "../../../lib/db";

export default NextAuth({

    session: {
        jwt: true
    },
    providers: [
        CredentialsProvider({

            //authorize method will be called when it receives incoming login request
            //here the credentials parameter(in authorize() function) is the second argument passed by signUp() function
            async authorize(credentials) {

                // console.log(credentials.email);
                //connecting to database
                const client = await connectToDatabase();
                // console.log('checking connection to db '+ client);

                // to check for valid user
                const usersCollection = client.db('auth-db').collection('users');
                // console.log('debug 1 '+ usersCollection);

                const user = await usersCollection.findOne({email : credentials.email});
                // const user = await usersCollection.findOne({ email:credentials.email });
                // console.log('debug 2 '+ user);


                if (!user) {
                    client.close();
                    throw new Error('No user found !');
                }

                // to check for valid password
                const isvalid = await verifyPassword(credentials.password, user.password);

                if (!isvalid) {
                    client.close();
                    throw new Error('Invalid Password');
                }

                client.close();
                return { email: user.email };

            }
        })
    ]
});