import type { NextApiRequest, NextApiResponse } from 'next';
import ConnectDB from '@/lib/mongodb';
import User, { IUser } from '@/models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // Connect to the database
    await ConnectDB();

    // Check the request method
    if (req.method === 'POST') {
        const { email, new_email, first_name, last_name } = req.body;

        // Validate email 
        if (!email ) {
            return res.status(400).json({ error: 'Email is required' });
        }


        // validate new_email
        if (!new_email) {
            return res.status(400).json({ error: 'New email is required' });
        }

        // Validate first_name
        if (!first_name ) {
            return res.status(400).json({ error: 'First name is required' });
        }

        
        // Validate kast_name
        if (!last_name ) {
            return res.status(400).json({ error: 'Last name is required' });
        }

        try {
            // Check if the user already exists
            const existingUser = await User.findOne({ email });

            if (!existingUser) {
                // User already exists
                return res.status(200).json({ error: 'User with given main not found' });
            }

            // Check if the new email is already in use by another user
            const IsEmailInUse = await User.findOne({ email: new_email });

            if (IsEmailInUse) {
                return res.status(409).json({ error: 'New email is already in use' });
            }


            // Update the user and return the updated user values

            const updatedUser: IUser | null = await User.findOneAndUpdate(

                { email }, // find the user with the specified current email
                { email: new_email, first_name, last_name }, // set the new email, first name, and last name
                { new: true, runValidators: true }

            );


            return res.status(200).json(updatedUser);
        } catch (error) {
          
            return res.status(500).json({ error: 'Internal server error' });
        }
    } else {
        // Method not allowed
        return res.status(405).json({ error: 'Method not allowed' });
    }
}
