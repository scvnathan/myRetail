import React from "react";
import Loader, {FullScreenLoader} from "../Loader";
import renderer from "react-test-renderer";

describe("Loader component", () => {
	it("should render correctly", () => {
		const comp = <Loader />;
		const tree = renderer.create(comp).toJSON();
		expect(tree).toMatchSnapshot();
	});

	it("should render correctly (Fullscreen)", () => {
		const comp = <FullScreenLoader />;
		const tree = renderer.create(comp).toJSON();
		expect(tree).toMatchSnapshot();
	});
});
