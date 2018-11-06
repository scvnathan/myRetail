import React from "react";
import Carousel from "../Carousel";
import { shallow } from "enzyme";
import testImages from "./images";

describe("Carousel component", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<Carousel images={testImages} />);
	});

	it("should render main image based on index (by default 0)", () => {
		expect(wrapper.find("MainImage").length).toBe(1);
		expect(wrapper.find("MainImage").prop('src')).toBe(testImages[0]);
	});

	it("should render the 2nd image, when the initial index is 1", () => {
		wrapper = shallow(<Carousel images={testImages} initial={1}/>);
		expect(wrapper.find("MainImage").prop('src')).toBe(testImages[1]);
	})

	it("should render thumbnails", () => {
		expect(wrapper.find("Thumbnail").length).toBe(testImages.length);
	});

	it("should update the main image on next button", () => {
		expect(wrapper.find("MainImage").prop('src')).toBe(testImages[0]);
		wrapper.find('ThumbnailBtnRight').simulate('click');
		expect(wrapper.find("MainImage").prop('src')).toBe(testImages[1]);
	});

	it("should update the main image on clicking the previous button", () => {
		wrapper = shallow(<Carousel images={testImages} initial={1}/>);
		expect(wrapper.find("MainImage").prop('src')).toBe(testImages[1]);
		wrapper.find('ThumbnailBtnLeft').simulate('click');
		expect(wrapper.find("MainImage").prop('src')).toBe(testImages[0]);
	});
});
