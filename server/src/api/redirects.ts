import { Router, Response } from 'express';

// Define routes for redirects
export default (router: Router) => {
    // Vooruit inparkeren
    router.get('/vooruitinparkeren', (req, res: Response) => {
        res.status(301).redirect('https://www.notion.so/Zonder-gedoe-op-pad-90d725fc2e2745e6bee322b76985125b');
    });
};
