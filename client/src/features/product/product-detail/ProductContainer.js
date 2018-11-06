import React from "react";
import WithProduct from "../state/WithProduct";
import ProductDetail from "./ProductDetail";
import PropTypes from "prop-types";
import { createTitleForPage } from "~root/App";

export class ProductContainer extends React.Component {
	constructor(props) {
		super(props);
	}

	async componentDidMount() {
		const { fetchProduct, id} = this.props;
		fetchProduct(id);
	}

	componentDidUpdate() {
		document.title = createTitleForPage(this.props.title);
	}

	render() {
		const { title, descriptions, channel, pricing, id, images, promos, returnPolicies, reviews } = this.props;
		return (
			<ProductDetail
				loading={this.props.loading}
				descriptions={descriptions}
				pricing={pricing}
				images={images}
				promos={promos}
				returnPolicies={returnPolicies}
				reviews={reviews}
				channel={channel}
				title={title}
				id={id}
			/>
		);
	}
}

ProductContainer.propTypes = {
	fetchProduct: PropTypes.func.isRequired,
	descriptions: PropTypes.object.isRequired,
	images: PropTypes.object.isRequired,
	pricing: PropTypes.object.isRequired,
	promos: PropTypes.array.isRequired,
	returnPolicies: PropTypes.object.isRequired,
	reviews: PropTypes.object.isRequired,
	title: PropTypes.string.isRequired,
	loading: PropTypes.bool.isRequired,
	channel: PropTypes.number.isRequired,
	id: PropTypes.number.isRequired
};

export default WithProduct(ProductContainer);
