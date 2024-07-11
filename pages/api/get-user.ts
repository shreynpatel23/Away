import type { NextApiRequest, NextApiResponse } from "next";
import ConnectDB from "@/lib/mongodb";
import User from "@/models/User";

// api route handler to handle getting user info based on email

export default async function handler(req: NextApiRequest, res: NextApiResponse){

    // connect to db
    await ConnectDB();

    // check req type
    if( req.method === "GET" ) {

        const { email } = req.body;

        console.log("from req", email);

        // validate email 
        if( !email ){
            return res.status(400).json({ error: "E-mail is required!"});
        }

        try {
            // find user with given email from database
            const user = await User.findOne( { email });
        
            // if user not found 
            if( !user ){

                return res.status(500).json({ error: "User not found with given e-mail."});

            }

            // return user with all the details
            return res.status(200).json(user);
        } catch(error) {
            
            console.log("Error while fetching user from database");

            return res.status(500).json({ error: "Internal server error"});
            
        }

    } else {

        // If the request method is not POST
       res.status(405).json({ error: 'Method not allowed' });
   }  
}
     
