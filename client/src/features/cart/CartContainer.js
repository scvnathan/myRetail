import React from "react";
import WithCart from "./state/WithCart";
import PropTypes from "prop-types";

export class CartContainer extends React.PureComponent {
	componentDidMount() {
		this.props.fetchCurrentCart(this.props.userId);
	}
	render() {
		const { cart, addToCart, inventoryTotal } = this.props;
		return React.cloneElement(this.props.children, { cart, addToCart, inventoryTotal });
	}
}

CartContainer.propTypes = {
	fetchCurrentCart: PropTypes.func.isRequired,
	addToCart: PropTypes.func.isRequired,
	cart: PropTypes.object.isRequired,
	inventoryTotal: PropTypes.number,
};

export default WithCart(CartContainer);
