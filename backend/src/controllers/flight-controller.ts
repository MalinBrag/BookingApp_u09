import axios from "axios";
import { Request, Response } from "express";

export const flightController = {

    getAmadeusToken: async (req: Request, res: Response): Promise<void> => {
        const clientId = process.env.API_KEY;
        const clientSecret = process.env.API_SECRET;

        if (!clientId || !clientSecret) {
            res.status(500).json({ error: 'API_KEY and API_SECRET is not set in the environment variables' });
            return;
        }

        try {
            const params = new URLSearchParams({
                grant_type: 'client_credentials',
                client_id: clientId,
                client_secret: clientSecret
            });

            const response = await axios.post('https://test.api.amadeus.com/v1/security/oauth2/token', params, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });

            const token = response.data.access_token;
            console.log('token', token);
            res.status(200).json({ access_token: token });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error during fetching token' });
        }
    },

    getFlights: async (req: Request, res: Response): Promise<void> => {
        try {
            const tokenResponse = await flightController.getAmadeusToken(req, res);
            const token = (tokenResponse as unknown as { access_token: string }).access_token;
            console.log('token', token);
            console.log('req.query', req.query);

            const response = await axios.get('https://test.api.amadeus.com/v1/shopping/flight-offers', {
                params: req.query,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            res.status(200).json(response.data);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Server error during fetching flights' });
        }
    }

}

