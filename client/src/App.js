import React from "react";
import styled, { createGlobalStyle } from "styled-components";
import font from "~public/font/Roboto-Regular.ttf";
import fontLight from "~public/font/Roboto-Light.ttf";
import ProductContainer from "~root/features/product/product-detail/ProductContainer";

const GlobalStyle = createGlobalStyle`
	@font-face {
		font-family: "Roboto";
		src: url(${font});
	}
	
	@font-face {
		font-family: "Roboto-Light";
		src: url(${fontLight});
	}
	
	body {
		margin:0;
		padding:0;
		background-color: #fff;
		color: ${props => props.theme.colors.text};
		font-family: 'Roboto', sans-serif;
	}
`;

const AppWrapper = styled.div`
	max-width: 1000px;
	margin: 0 auto;
	padding: 10px 10px 0;
`;

export const createTitleForPage = subtitle => `myRetail${subtitle ? ` - ${subtitle}` : ""}`;

const demoProductId = "205273068";
export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = { onDemoUrl: false };
	}

	componentDidMount() {
		document.title = createTitleForPage();

		//Redirect purely for URL prettiness as an example of what a PDP url could be
		const demoUrl = `/product/${demoProductId}`;
		if (location.pathname !== demoUrl) {
			location = demoUrl;
		} else {
			this.setState({ onDemoUrl: true });
		}
	}

	render() {
		return (
			<AppWrapper>
				{this.state.onDemoUrl && <ProductContainer id={demoProductId} />}
				<GlobalStyle />
			</AppWrapper>
		);
	}
}
