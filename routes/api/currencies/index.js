import express from 'express';
import axios from 'axios';

const router = express.Router();

// http://localhost:9999/api/currencies/:base route
router.get('/:base', async (req, res) => {
	try {
		// get request with base parameter to external public API for a live exchange rates for currencies
		const result = await axios.get(
			`https://api.exchangeratesapi.io/latest?base=${req.params.base}`
		);
		// send the response back with the data
		res.send(result.data).status(200);
	} catch (err) {
		// handle errors
		res.status(500).send({ error: err });
	}
});

export default router;
