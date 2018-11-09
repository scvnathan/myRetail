import React from "react";
import Loader from "../QuantitySelect";
import renderer from "react-test-renderer";
import { shallow } from "enzyme";
import QualitySelect from "~root/common/QuantitySelect";

describe("QuantitySelect component", () => {
	let wrapper;
	const quantityValueSel = '[data-test="quantityValue"]';
	const incSel = '[data-test="incBtn"]';
	const decSel = '[data-test="decBtn"]';
	let getQuantity = w => parseInt(w.find(quantityValueSel).text(), 10);

	beforeEach(() => {
		wrapper = shallow(<QualitySelect />);
	});

	it("should render correctly", () => {
		const comp = <Loader />;
		const tree = renderer.create(comp).toJSON();
		expect(tree).toMatchSnapshot();
	});

	it("should increment the local count", () => {
		const inc = wrapper.find(incSel);
		const originalValue = getQuantity(wrapper);

		inc.simulate("click");
		expect(getQuantity(wrapper)).toBe(originalValue + 1);
	});

	it("should decrement the local count", () => {
		const inc = wrapper.find(incSel);
		const dec = wrapper.find(decSel);
		const originalValue = getQuantity(wrapper);

		inc.simulate("click");
		expect(getQuantity(wrapper)).toBe(originalValue + 1);

		dec.simulate("click");
		expect(getQuantity(wrapper)).toBe(originalValue);
	});

	it("should prevent quantity from decreasing below 1", () => {
		const dec = wrapper.find(decSel);
		const originalValue = getQuantity(wrapper);
		expect(wrapper.state().quantity).toBe(1);
		expect(originalValue).toBe(1);
		dec.simulate("click");
		expect(getQuantity(wrapper)).toBe(originalValue);
		expect(wrapper.state().quantity).toBe(1);
	});

	it("should prevent quantity from increasing above max", () => {
		const max = 3;
		wrapper = shallow(<QualitySelect max={max} />);
		const inc = wrapper.find(incSel);
		const originalValue = getQuantity(wrapper);

		expect(wrapper.state().quantity).toBe(1);
		expect(originalValue).toBe(1);

		inc.simulate("click");
		inc.simulate("click");
		inc.simulate("click");

		//started 1, clicked 3 times, but it shouldn't go over the max

		expect(getQuantity(wrapper)).toBe(originalValue + 2);
		expect(wrapper.state().quantity).toBe(originalValue + 2);
	});
});
