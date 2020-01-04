import React from 'react';
import PropTypes from 'prop-types';
import { Container, Label } from './currency.style';

/**
 * The currencies component including the Label with the SelectBox.
 * @param {*} props
 */
const currencies = props => {
	return (
		<Container>
			<Label>Change Currency</Label>:
			<select
				className="dropdown"
				name="currency"
				value={props.currency}
				onChange={props.onChange}
				style={{ border: 'solid' }}
			>
				{props.currencies.map(currency => (
					<option key={currency} value={currency}>
						{currency}
					</option>
				))}
			</select>
		</Container>
	);
};

currencies.propTypes = {
	currency: PropTypes.string,
	currencies: PropTypes.array,
	onChange: PropTypes.func
};

export default currencies;
