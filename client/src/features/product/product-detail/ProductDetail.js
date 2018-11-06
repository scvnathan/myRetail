import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

import ProductDescription from "./ProductDescription";
import ReviewList from "./review/ReviewList";
import { FullScreenLoader } from "~common/Loader";
import ProductPurchaseOptions from "./ProductPurchaseOptions";
import { Price, Qualifier } from "./Price";
import ProductSplash from "~root/features/product/product-detail/ProductSplash";
import CartContainer from "~root/features/cart/CartContainer";
import CartInventory from "~root/features/cart/CartInventory"

const DetailColumn = styled.div`
	min-width: 490px;
	max-width: 490px;
	margin-right: 2em;
`;

const ReviewWrapper = styled(DetailColumn)`
	@media all and (min-width: 999px) {
		margin-top: -8em;
	}
`;

const ProductWrapper = styled.div`
	flex-flow: wrap;
	@media all and (min-width: 999px) {
		flex-flow: nowrap;
	}
	display: flex;
	flex-direction: row;
`;

const ProductDetail = (props) => {
	if (props.loading) {
		return <FullScreenLoader />;
	}

	const { title, descriptions, pricing, images, channel, promos, id, reviews } = props;
	return (
		<>
			<ProductWrapper>

				<DetailColumn>
					<ProductSplash images={images.all} initialImage={images.initial} title={title} maxViewable={3} />
				</DetailColumn>

				<DetailColumn>
					<div>
						<CartInventory />
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
}
ProductDetail.displayName = 'ProductDetail';
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

export default ProductDetail;
