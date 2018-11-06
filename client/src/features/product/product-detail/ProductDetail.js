import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import ProductDescription from "./ProductDescription";
import ReviewList from "./review/ReviewList";
import { FullScreenLoader } from "~common/Loader";
import ProductPurchaseOptions from "./ProductPurchaseOptions";
import { Price, Qualifier } from "./Price";
import ProductSplash from "~root/features/product/product-detail/ProductSplash";
import CartInventory from "~root/features/cart/CartInventory";

const minWidth = "490px;";
const DetailColumn = styled.div`
	min-width: ${minWidth};
	max-width: ${minWidth};
	@media all and (min-width: 999px) {
		margin-right: 20px;
	}
`;

const ReviewWrapper = styled.div`
	display: flex;
	justify-content: center;
	@media all and (min-width: 999px) {
		display: block;
		margin-top: -8em;
	}
`;

const ProductWrapper = styled.div`
	flex-flow: wrap;
	justify-content: center;
	@media all and (min-width: 999px) {
		justify-content: space-between;
		flex-flow: nowrap;
	}
	display: flex;
	flex-direction: row;
`;

const CartInventoryWrapper = styled.div`
	margin: 0 auto;
	@media all and (min-width: 999px) {
		margin: 0;
		width: 100%;
	}
`;
const ProductDetail = props => {
	if (props.loading) {
		return <FullScreenLoader />;
	}

	const { title, descriptions, pricing, images, channel, promos, id, reviews } = props;
	return (
		<>
			<CartInventoryWrapper>
				<CartInventory />
			</CartInventoryWrapper>
			<ProductWrapper>
				<DetailColumn>
					<ProductSplash images={images.all} initialImage={images.initial} title={title} maxViewable={3} />
				</DetailColumn>

				<DetailColumn>
					<div>
						<Price>{pricing.price}</Price>
						<Qualifier>{pricing.qualifier}</Qualifier>
					</div>

					<ProductPurchaseOptions id={id} channel={channel} pricing={pricing} promos={promos} />

					<ProductDescription features={descriptions.full} />
				</DetailColumn>
			</ProductWrapper>

			<ReviewWrapper>
				<DetailColumn>
					<ReviewList reviews={reviews} />
				</DetailColumn>
			</ReviewWrapper>
		</>
	);
};
ProductDetail.displayName = "ProductDetail";
ProductDetail.propTypes = {
	descriptions: PropTypes.object.isRequired,
	images: PropTypes.object.isRequired,
	pricing: PropTypes.object.isRequired,
	promos: PropTypes.array.isRequired,
	returnPolicies: PropTypes.object.isRequired,
	reviews: PropTypes.object.isRequired,
	title: PropTypes.string.isRequired,
	channel: PropTypes.number.isRequired,
	loading: PropTypes.bool.isRequired,
	id: PropTypes.number.isRequired
};

export default React.memo(ProductDetail);
