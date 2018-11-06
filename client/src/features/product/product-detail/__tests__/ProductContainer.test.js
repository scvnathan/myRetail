import React from "react";
import enzyme, { shallow } from "enzyme";
import { ProductContainer } from "../ProductContainer";
import ProductDetail from "../ProductDetail";
import { createTitleForPage } from "~root/App";

describe("ProductContainer component", () => {
	let wrapper;
	const mockFetchAction = jest.fn();
	const testTitle = "ProductContainer test";
	beforeEach(() => {
		wrapper = shallow(
			<ProductContainer
				fetchProduct={mockFetchAction}
				descriptions={{}}
				images={{}}
				pricing={{}}
				promos={[]}
				returnPolicies={{}}
				reviews={{}}
				title={""}
				loading={false}
				channel={0}
				id={0}
			/>
		);
	});

	it("should call the fetchProduct action on mount", () => {
		wrapper.update();
		expect(mockFetchAction.mock.calls.length).toBe(1);
	});

	it("should render ProductDetail", () => {
		expect(wrapper.find(ProductDetail).length).toBe(1);
	});

	it("should set the title based on product's title prop", () => {
		expect(global.window.document.title).toBe("");
		wrapper.setProps({title: testTitle});
		expect(global.window.document.title).toBe(createTitleForPage(testTitle));
	});
});
