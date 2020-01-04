import express from 'express';
import reservations from './reservations';
import currencies from './currencies';

const router = express.Router();

// http://localhost:9999/api/reservations route
router.use('/reservations', reservations);
// http://localhost:9999/api/currencies route
router.use('/currencies', currencies);

export default router;
