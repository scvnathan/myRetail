import React from "react";
import ProductPurchaseOptions from "../ProductPurchaseOptions";
import {shallow, mount} from "enzyme";
import CanAddToCart from "~root/features/cart/CanAddToCart"
import theme from '~root/theme';
import {ThemeProvider} from "styled-components";

describe("ProductPurchaseOptions component", () => {
	let wrapper;
	const mockAddToCart = jest.fn();
	const renderComponent = () => mount(<ThemeProvider theme={theme}><ProductPurchaseOptions promos={[]} pricing={{}} channel={0} addToCart={mockAddToCart} cart={{}}/></ThemeProvider>);

	beforeEach(() => {
		wrapper = renderComponent()
	});

	it("should call addToCart callback on clicking Add to Cart button", () => {
		expect(mockAddToCart.mock.calls.length).toBe(0);
		expect(wrapper.find(CanAddToCart).find('PrimaryButton').length).toBe(1);
		wrapper.find(CanAddToCart).find('PrimaryButton').simulate('click');
		expect(mockAddToCart.mock.calls.length).toBe(1);
	});
});
