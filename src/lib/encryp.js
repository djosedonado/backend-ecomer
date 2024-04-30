import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export async function createAccessToken(payload) {
    try {
        if (typeof payload !== 'object' || payload === null) {
            throw new Error('Payload must be a valid object');
        }

        const token = await jwt.sign(payload, process.env.SECRET, {
            expiresIn: '2m',
        });

        return token;
    } catch (error) {
        console.error('Error creating access token:', error);
        throw error;
    }
}