import React from 'react';
import { StyledCard, Currency, Title, Info } from './reservation.style';
import './reservation.css';
import { useMediaQuery } from 'react-responsive';
import classNames from 'classnames';
import PropTypes from 'prop-types';

/**
 * Our reservation component
 * @param {*} props
 */
const reservation = props => {
	const forSmallDevicesAndAbove = useMediaQuery({
		query: '(min-width: 576px)'
	});
	const forExtraSmallDevices = useMediaQuery({
		query: '(max-width: 575px)'
	});

	const UuidClassName = classNames({
		'container text-center paddding-bottom-3': forExtraSmallDevices,
		'paddding-left-5 paddding-bottom-3': forSmallDevicesAndAbove
	});

	return (
		<StyledCard className="row">
			<Currency className="col-sm-12">
				{props.price}
				{props.currency}
			</Currency>
			<div className="col-sm-3 col-6">
				<div className="padding-top-bottom-10 paddding-left-35">
					<Title>Check-In</Title>
					<Info>{props.check_in}</Info>
				</div>
			</div>
			<div className="col-sm-3 col-6">
				<div className="padding-top-bottom-10">
					<Title>Check-Out</Title>
					<Info>{props.check_out}</Info>
				</div>
			</div>
			{forSmallDevicesAndAbove && (
				<>
					<div className="col-sm-3 col-12">
						<div className="padding-top-bottom-10">
							<Title>Hotel</Title>
							<Info>{props.hotel}</Info>
						</div>
					</div>
					<div className="col-sm-3 col-12">
						<div className="padding-top-bottom-10">
							<Title>Room</Title>
							<Info>{props.room_name}</Info>
						</div>
					</div>
				</>
			)}
			{forExtraSmallDevices && (
				<>
					<div className="col-sm-3 col-12">
						<div className="padding-top-bottom-10 paddding-left-35">
							<Title>Room</Title>
							<Info>{props.room_name}</Info>
						</div>
					</div>
					<div className="col-sm-3 col-12">
						<div className="padding-top-bottom-10 paddding-left-35">
							<Title>Hotel</Title>
							<Info>{props.hotel}</Info>
						</div>
					</div>
				</>
			)}
			<div className={UuidClassName}>
				<small>
					<small>
						<b>{props.uuid}</b>
					</small>
				</small>
			</div>
		</StyledCard>
	);
};

reservation.propTypes = {
	price: PropTypes.number,
	currency: PropTypes.string,
	check_in: PropTypes.string,
	check_out: PropTypes.string,
	hotel: PropTypes.string,
	room_name: PropTypes.string,
	uuid: PropTypes.string
};

export default reservation;
