import EventEmitter from 'events';
import faker from 'faker';

const emitter = new EventEmitter();
const NEW_RESERVATION_EVENT = 'newReservation';

let timeoutId;
/**
 * Generate new reservation
 */
const generate = () => {
	const reservation = {
		uuid: faker.random.uuid(),
		hotel_id: faker.random.number({ min: 1, max: 5 }),
		currency: ['usd', 'ils', 'eur'][faker.random.number({ min: 0, max: 2 })],
		price: parseFloat(faker.random.number({ min: 100, max: 500, precision: 0.01 }).toFixed(2)),
		guest_name: faker.name.findName(),
		room_name: faker.lorem.words(),
		arrival_date: faker.date.future(),
		nights: faker.random.number({ min: 1, max: 5 })
	};

	emitter.emit(NEW_RESERVATION_EVENT, reservation);

	timeoutId = setTimeout(
		generate,
		faker.random.number({ min: 1000, max: 10000, precision: 1000 })
	);
};

let running = false;
/**
 * Start the service that generates new reservations
 * @param {*} newReservationCallback
 */
export const start = newReservationCallback => {
	console.log('Reservation service has been started');
	if (running) {
		return;
	}

	running = true;
	emitter.on(NEW_RESERVATION_EVENT, newReservationCallback);
	generate();
};

/**
 * Stop the service that generates new reservations
 */
export const stop = () => {
	clearTimeout(timeoutId);
	running = false;
	emitter.removeAllListeners(NEW_RESERVATION_EVENT);
	console.log('Reservation service has been stopped');
};
