import React from "react";
import Carousel from "~root/common/Carousel";
import styled from "styled-components";

const Wrapper = styled.div`
	width: ${props => props.width};
`;

const Title = styled.h1`
	text-align: center;
	font-weight: normal;
	font-family: "Roboto-Light", sans-serif;
	margin-top: 0;
	font-size: 187%;
`;

function ProductSplash(props) {
	const { images, initialImage, title } = props;
	return (
		<Wrapper width={props.width}>
			<Title>{title}</Title>
			<Carousel data-test="pdp_carousel" images={images} initial={initialImage} maxViewable={3} />
		</Wrapper>
	);
}

export default React.memo(ProductSplash);
