import express from 'express';
import open from 'open';
import routes from '@upstay/routes';
import * as reservationsService from '@upstay/services/reservations';
import { addReservation, getReservation } from '@upstay/db/reservations';
import serverDev from './server.dev';
import serverIO from './server.io';

const app = express();
const port = process.env.PORT || 9999;
const appURL = `http://localhost:${port}`;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.use(routes);

serverDev(app);

// socket.io server
const server = serverIO(app, socket => {
	console.log('New socket connected: ', socket.id);
	reservationsService.start(reservation => {
		try {
			addReservation(reservation).then(reservationId => {
				if (reservationId) {
					console.log('New reservation added with id: ', reservationId);
					// get reservation from DB to send it to client with data including the hotel name
					getReservation(reservation).then(reservationFullDetails => {
						socket.emit('newReservation', reservationFullDetails);
					});
				}
			});
		} catch (error) {
			// handle errors
			console.log('error in reservationsService start callback: ', error);
		}
	});
	// stop reservation service after 60 seconds
	setTimeout(reservationsService.stop, 1000 * 60);
});

server.listen(port, () => {
	console.log(`Server started ${appURL}`);
	open(appURL);
});
