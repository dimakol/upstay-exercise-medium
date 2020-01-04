import express from 'express';
import { getReservations } from '../../../db/reservations';

const router = express.Router();

// http://localhost:9999/api/reservations route
router.get('/', async (req, res) => {
	try {
		// get all reservations from DB
		const reservations = await getReservations();
		// send back all reservations as a response
		res.send(reservations).status(200);
	} catch (err) {
		// handle errors
		res.status(500).send({ error: err });
	}
});

export default router;
