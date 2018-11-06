import React from "react";
import enzyme, { shallow } from "enzyme";
import {CartContainer}  from "../CartContainer";

describe("CartContainer component", () => {
	let wrapper;
	const mockFetchCurrentCart = jest.fn();
	const mockAddToCart = jest.fn();

	beforeEach(() => {
		wrapper = shallow(
			<CartContainer fetchCurrentCart={mockFetchCurrentCart} cart={{}} addToCart={mockAddToCart}><div/></CartContainer>
		);
	});

	it("should call the fetchCart action on mount", () => {
		wrapper.update();
		expect(mockFetchCurrentCart.mock.calls.length).toBe(1);
	});
});
