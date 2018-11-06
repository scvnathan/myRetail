import React from "react";
import WithCart from "~root/features/cart/state/WithCart";
import PropTypes from "prop-types";
import styled from "styled-components"


const CartInventoryWrapper = styled.div`
	display: flex;
	justify-content: end;
`
CartInventoryWrapper.displayName = "CartInventory";

const CartInventoryBox = styled.div`
	margin-bottom:1em;
	padding: 4px;
	border: 2px solid #ddd;
	background-color:#eee;
	border-radius: 3px;
	vertical-align:middle;
	font-size:1.5em;
	color: ${props => props.theme.colors.text}
`

const CartIcon = styled.span`
	padding-right:5px;
	:before {
		content: '🛒'
	}
`

export const CartInventory = props => {
	return <CartInventoryWrapper>
		<CartInventoryBox>
			<CartIcon /><strong>{props.inventoryTotal}</strong>
		</CartInventoryBox>
	</CartInventoryWrapper>;
};
CartInventory.propTypes = {
	inventoryTotal: PropTypes.number
};
export default WithCart(CartInventory);
