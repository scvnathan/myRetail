import React from "react";
import Loader from "../QuantitySelect";
import renderer from "react-test-renderer";
import {shallow} from "enzyme"
import QualitySelect from "~root/common/QuantitySelect"

describe("QuantitySelect component", () => {
	let wrapper;
	const quantityValueSel = '[data-test="quantityValue"]';
	const incSel = '[data-test="incBtn"]';
	const decSel = '[data-test="decBtn"]';
	let getQuantity = (w) => parseInt(w.find(quantityValueSel).text(), 10);

	beforeEach(() => {
		wrapper = shallow(<QualitySelect />);
	})

	it("should render correctly", () => {
		const comp = <Loader />;
		const tree = renderer.create(comp).toJSON();
		expect(tree).toMatchSnapshot();
	});

	it("should increment the local count", () => {
		const inc = wrapper.find(incSel)
		const originalValue = getQuantity(wrapper);

		inc.simulate('click');
		expect(getQuantity(wrapper)).toBe(originalValue + 1);
	});

	it("should decrement the local count", () => {
		const inc = wrapper.find(incSel)
		const dec = wrapper.find(decSel)
		const originalValue = getQuantity(wrapper);

		inc.simulate('click');
		expect(getQuantity(wrapper)).toBe(originalValue + 1);

		dec.simulate('click');
		expect(getQuantity(wrapper)).toBe(originalValue);
	});
});
