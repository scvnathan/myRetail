import React from "react";
import styled from "styled-components";
import QualitySelect from "~root/common/QuantitySelect";
import { PrimaryButton, SecondaryButton, TertiaryButton } from "~root/common/Button";
import Separator from "~root/common/Separator";
import Promo from "~root/features/product/product-detail/Promo";
import PropTypes from "prop-types";
import Maybe from "maybe-baby";
import CanPickupInStore from "~root/features/cart/CanPickupInStore";
import CanAddToCart from "~root/features/cart/CanAddToCart";
import ReturnsInfo from "~root/features/product/product-detail/returns/ReturnsInfo";
import WithCart from "~root/features/cart/state/WithCart"

const returnCopy =
	"This item must be returned within 30 days of the ship date. See return policy for details. Prices, promotions, styles and availability may vary by store and online.";

const ButtonRow = styled.div`
	margin: 2em 0 2em;
	display: flex;
	justify-content: space-evenly;
`;

export class ProductPurchaseOptions extends React.Component {
	constructor(props) {
		super(props);
		this.state = { quantityToAdd: props.quantityToAdd };
		this.addToCart = this.addToCart.bind(this);
		this.updateQuantity = this.updateQuantity.bind(this);
	}

	addToCart() {
		const { pricing, id, addToCart } = this.props;
		if (this.state.quantityToAdd > 0) {
			addToCart(id, this.state.quantityToAdd, pricing.price);
		}
	}

	updateQuantity(quantity) {
		this.setState({ quantityToAdd: quantity });
	}

	render() {
		const copy = Maybe.of(() => this.props.returnsData.copy)
			.orElse(returnCopy)
			.join();
		const { promos, channel, cart } = this.props;
		return (
			<div>
				<Separator width={"100%"} />
				<Promo promos={promos} />
				<Separator margin={"2em 0 2em"} width={"100%"} />
				<QualitySelect initial={this.state.quantityToAdd} onUpdateQuantity={this.updateQuantity} />
				<ButtonRow>
					<CanPickupInStore
						channel={channel}
						render={() => <SecondaryButton margin={"0 5px 0 0"}>PICK UP IN STORE</SecondaryButton>}
					/>
					<CanAddToCart
						channel={channel}
						render={() => (
							<PrimaryButton data-test="pdp_addToCart" disabled={cart.loading} onClick={this.addToCart}>
								ADD TO CART
							</PrimaryButton>
						)}
					/>
				</ButtonRow>

				<ReturnsInfo copy={copy} />

				<ButtonRow>
					<TertiaryButton>ADD TO REGISTRY</TertiaryButton>
					<TertiaryButton>ADD TO LIST</TertiaryButton>
					<TertiaryButton>SHARE</TertiaryButton>
				</ButtonRow>
			</div>
		);
	}
}

ProductPurchaseOptions.propTypes = {
	cart: PropTypes.object,
	addToCart: PropTypes.func,
	id: PropTypes.number,
	pricing: PropTypes.object,
	channel: PropTypes.number,
	promos: PropTypes.array
};

ProductPurchaseOptions.defaultProps = {
	quantityToAdd: 1
};

export default WithCart(ProductPurchaseOptions);
