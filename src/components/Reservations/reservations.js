import React from 'react';
import Reservation from './reservation/reservation';
import { CURRENCY_SYMBOLS } from '../../utils/currency';
import moment from 'moment';

/**
 * Reservations component
 * @param {*} props
 */
const reservations = props =>
	props.reservations.map((reservation, index) => {
		return (
			<Reservation
				key={index}
				id={reservation.id}
				uuid={reservation.uuid}
				hotel={reservation.name}
				currency={
					CURRENCY_SYMBOLS[reservation.currency.toUpperCase()]
						? CURRENCY_SYMBOLS[reservation.currency.toUpperCase()]
						: reservation.currency.toUpperCase()
				}
				price={reservation.price}
				guest_name={reservation.guest_name}
				room_name={reservation.room_name}
				check_in={moment(reservation.arrival_date).format('DD MMM, YYYY')}
				check_out={moment(reservation.arrival_date)
					.add(reservation.nights, 'days')
					.format('DD MMM, YYYY')}
			/>
		);
	});

export default reservations;
