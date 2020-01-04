import { query } from './pg';

/**
 * A query to DB that returns all reservations with their hotel names
 */
export const getReservations = async () => {
	const text =
		'SELECT r.id, r.uuid, h.name, r.currency, r.price, r.guest_name, r.room_name, r.arrival_date, r.nights FROM reservations r LEFT JOIN hotels h ON r.hotel_id = h.id';
	let response;
	try {
		response = await query(text, null);
	} catch (error) {
		console.log('error in query: ', error);
		throw error;
	}
	return response.rows;
};

/**
 * A query to DB that returns the reservation with the hotel name
 * @param {*} reservation - the reservation object to read
 */
export const getReservation = async reservation => {
	const text =
		'SELECT r.id, r.uuid, h.name, r.currency, r.price, r.guest_name, r.room_name, r.arrival_date, r.nights FROM reservations r LEFT JOIN hotels h ON r.hotel_id = h.id WHERE r.uuid = $1';
	const params = [reservation.uuid];
	let response;
	try {
		response = await query(text, params);
	} catch (error) {
		console.log('error in query: ', error);
		throw error;
	}
	return response.rows[0];
};

/**
 * A query to DB that insert the reservation
 * @param {*} reservation - the reservation object to create
 */
export const addReservation = async reservation => {
	const text =
		'INSERT INTO reservations(uuid, hotel_id, currency, price, guest_name, room_name, arrival_date, nights) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';
	const params = [
		reservation.uuid,
		reservation.hotel_id,
		reservation.currency,
		reservation.price,
		reservation.guest_name,
		reservation.room_name,
		reservation.arrival_date,
		reservation.nights
	];
	let response;
	try {
		response = await query(text, params);
	} catch (error) {
		console.log('error in query in addReservation function');
		throw error;
	}
	return response.rows[0].id;
};
