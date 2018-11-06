import React from "react";
import CanPickupInStore from "../CanPickupInStore";
import {shallow} from "enzyme";

describe("CanPickupInStore", () => {
	const render = (component, channel) => shallow(<CanPickupInStore channel={channel} render={component} />)

	it("should render children if purchasingChannelCode is 0 or 2", () => {
		const component = () => <div/>
		let wrapper = render(component, 1);
		expect(wrapper.get(0)).toBeNull();

		wrapper = render(component, 0);
		expect(wrapper.get(0)).not.toBe(null);

		wrapper = render(component, 2);
		expect(wrapper.get(0)).not.toBe(null);
	});
});
