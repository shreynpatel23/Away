import type { NextApiRequest, NextApiResponse } from "next";
import ConnectDB from "@/lib/mongodb";
import User from "@/models/User";

// api route handler to handle adding user to db and validation

export default async function handler(req: NextApiRequest, res: NextApiResponse){

    // connect to db
    await ConnectDB();

    // check req type
    // if post extract data from request
    if( req.method === 'POST'){

        const { email, name } = req.body;

        // validate email and name
        if( !email ){
            return res.status(400).json({ error: "E-mail is required!"});
        }

        if ( !name ){
            return res.status(400).json({ error: "Name is required!"})
        }

        // check user is new or existing user
        try{
            const isExistingUser  = await User.findOne( {email} );
        
            // if user is new then save it to database

            if( !isExistingUser ){

                // by default making isPaidUser false
                // ** Will change it later according to the user flow **
                const newUser = new User({ email, name, isPaidUser:false});
                await newUser.save();

                return res.status(201).json(newUser);
            } else {

                // if user is existing then dont need to save it to database
                return res.status(201).json("User already exists");
            } 
            
            
        } catch( error ){
            return res.status(500).json({ error: "Internal server error"});
        }
        

    } else {

        
         // If the request method is not POST
        res.status(405).json({ error: 'Method not allowed' });
    }  
}