import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const styles = {
	root: {
		width: '375px'
	},
	input: {
		color: 'orange'
	}
};

/**
 * Customized input component for the filter
 * @param {*} props
 */
const CustomizedInput = props => {
	const { classes } = props;

	return (
		<TextField
			className={classes.root}
			InputProps={{
				className: classes.input
			}}
			id={props.id}
			type={props.type}
			placeholder={props.placeholder}
			color={props.color}
			value={props.value}
			onChange={props.onChange}
			style={props.style}
		/>
	);
};

CustomizedInput.propTypes = {
	classes: PropTypes.object.isRequired,
	id: PropTypes.string,
	type: PropTypes.string,
	placeholder: PropTypes.string,
	color: PropTypes.string,
	value: PropTypes.string,
	onChange: PropTypes.func,
	style: PropTypes.object
};

export default withStyles(styles)(CustomizedInput);
