import React from "react";
import PropTypes from "prop-types";

const CanAddToCart = props => {
	const canAdd = [0, 1].includes(parseInt(props.channel, 10));
	if (canAdd) {
		return <>{props.render()}</>;
	}
	return null;
};

CanAddToCart.displayName = 'CanAddToCart'

CanAddToCart.propTypes = {
	render: PropTypes.func.isRequired
};

export default CanAddToCart;
