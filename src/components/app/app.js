import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';
import { SpringSpinner } from 'react-epic-spinners';
import CustomizedInput from '../filter/customFilter';
import Currency from '../currency/currency';
import Reservations from '../Reservations/reservations';
import { Container, PageTitle, ErrorMsg } from './app.style';

// making socket request to the server endpoint.
const socket = io('http://localhost:9999');

/**
 * The main app component.
 */
const App = () => {
	const [reservations, setReservations] = useState([]); // Reservations
	const [isLoading, setIsLoading] = useState(false); // Loading indicator
	const [isError, setIsError] = useState(false); // Error msg
	const [searchTerm, setSearchTerm] = useState(''); // Filter
	const [currency, setCurrency] = useState('USD'); // Current currency selected
	const [currencies, setCurrencies] = useState([]); // All currencies options

	/**
	 * Handler for filter input by uuid
	 * @param {*} event
	 */
	const handleFilter = event => {
		setSearchTerm(event.target.value);
	};

	/**
	 * Handler for select of currency
	 * @param {*} event
	 */
	const handleDropDown = event => {
		setCurrency(event.target.value);
		setIsError(false);
		setIsLoading(true);

		try {
			// exchange all the reservations prices to the selected currency
			exchange(reservations, event.target.value).then(reservations => {
				setReservations(reservations);
				setIsLoading(false);
			});
		} catch (error) {
			setIsError(true);
			setIsLoading(false);
		}
	};

	/**
	 * The reservations results depending on the filter
	 */
	const results = !searchTerm
		? reservations
		: reservations.filter(reservation =>
				reservation.uuid.toLowerCase().startsWith(searchTerm.toLowerCase())
		  );

	/**
	 * Exchange the prices of reservations.
	 * @param {*} reservations - array of our reservations
	 * @param {*} convertTo - the currency to convert our reservations prices
	 * Returns the reservations updated with exchanged prices and currencies.
	 */
	const exchange = async (reservations, convertTo) => {
		return Promise.all(
			reservations.map(reservation => {
				try {
					return updateReservationPrice(reservation, convertTo);
				} catch (error) {
					console.log(error);
					throw error;
				}
			})
		);
	};

	/**
	 * Updates the reservation currency and price according to the given paramter 'convertTo'
	 * @param {*} reservation - The reservation to update
	 * @param {*} convertTo - The symbol to convert the reservation price and currency
	 */
	const updateReservationPrice = async (reservation, convertTo) => {
		// get the rate of the currency and update the reservation price
		const updatedReservation = getRate(reservation.currency.toUpperCase(), convertTo).then(
			rate => {
				// update the price of reservation according to the rate
				reservation.price = Number((reservation.price * rate).toFixed(2));
				// update the currency of reservation
				reservation.currency = convertTo.toLowerCase();
				return reservation;
			}
		);
		return updatedReservation;
	};

	/**
	 * Returns the rate of the target currency
	 * @param {*} base - base currency
	 * @param {*} convertTo - target currency
	 */
	const getRate = async (base, convertTo) => {
		try {
			// get request to our api route
			let response = await axios.get(`http://localhost:9999/api/currencies/${base}`);
			// get the required rate according to target currency
			const rate = response.data.rates[convertTo];
			return rate;
		} catch (error) {
			console.log('Error in get currency rate: ', error);
			throw error;
		}
	};

	/**
	 * Making http request to our api route (requesting currencies)
	 * and populating the Select box with the response data
	 */
	useEffect(() => {
		const source = axios.CancelToken.source();

		const fetchData = async () => {
			setIsError(false);
			setIsLoading(true);

			try {
				// making http request to our api route for currencies
				const result = await axios(`http://localhost:9999/api/currencies/${currency}`, {
					cancelToken: source.token
				});
				//console.log('currencies from API: ', result.data); // TODO: Dima Debug
				// populate the ComboBox with the data that we get
				setCurrencies(Object.keys(result.data.rates));
			} catch (error) {
				setIsError(true);
				if (axios.isCancel(error)) {
					console.log('request cancelled');
				} else {
					throw error;
				}
			}
		};

		fetchData();
	}, []);

	/**
	 * Making http request to our api route (requesting reservations).
	 * Making the exhange of the prices according the selected currency.
	 * Setting the reservations after exchange in our state.
	 */
	useEffect(() => {
		const source = axios.CancelToken.source();

		const fetchData = async () => {
			setIsError(false);
			setIsLoading(true);

			try {
				// making http request to our api route for reservations
				const result = await axios('http://localhost:9999/api/reservations/', {
					cancelToken: source.token
				});
				//console.log('reservations from API: ', result.data); // TODO: Dima Debug
				// exchanging all the reservations prices according to the selected currency
				exchange(result.data, currency).then(reservations => {
					setReservations(reservations);
					setIsLoading(false);
				});
			} catch (error) {
				setIsError(true);
				setIsLoading(false);
				if (axios.isCancel(error)) {
					console.log('request cancelled');
				} else {
					throw error;
				}
			}
		};

		fetchData();

		return () => {
			source.cancel();
		};
	}, []);

	/**
	 * Listening for new reservation event from the socketIO
	 * and add it to our reservations state
	 */
	useEffect(() => {
		socket.on('newReservation', reservation => {
			//console.log('newReservation: ', reservation);	// TODO: Dima Debug
			updateReservationPrice(reservation, currency).then(
				updatedReservation => {
					// adding the new reservation to previous reservations array by using array spread operator.
					setReservations(reservations => [...reservations, updatedReservation]);
				},
				error => {
					console.log(error);
					setIsError(true);
				}
			);
		});
	}, []);

	return (
		<Container>
			<PageTitle>UpStay Reservations</PageTitle>

			{isError && <ErrorMsg>Something went wrong ...</ErrorMsg>}

			{isLoading ? (
				<SpringSpinner color="lightblue" style={{ margin: '0 auto' }}></SpringSpinner>
			) : (
				<div>
					<CustomizedInput
						id="uuidFilter"
						type="text"
						placeholder="Filter by uuid"
						color="secondary"
						value={searchTerm}
						onChange={handleFilter}
						style={{ marginLeft: '20px' }}
					/>
					<Currency
						currencies={currencies}
						currency={currency}
						onChange={handleDropDown}
					/>
					<Reservations reservations={results} />
				</div>
			)}
		</Container>
	);
};

export default App;
