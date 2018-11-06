import React from "react";
import PropTypes from "prop-types";

const CanPickupInStore = props => {
	const canPickup = [0, 2].includes(parseInt(props.channel, 10));
	if (canPickup) {
		return <>{props.render()}</>;
	}
	return null;
};

CanPickupInStore.displayName = 'CanPickupInStore'

CanPickupInStore.propTypes = {
	render: PropTypes.func.isRequired
};

export default CanPickupInStore;
