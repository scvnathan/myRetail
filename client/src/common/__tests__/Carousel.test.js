import React from "react";
import Carousel from "../Carousel";
import { mount, shallow } from "enzyme";
import renderer from "react-test-renderer";
import testImages from "./images";

describe("Carousel component", () => {
	let wrapper;
	const findModal = w => w.find('[data-test="imageModal"]');

	beforeEach(() => {
		wrapper = shallow(<Carousel images={testImages} />);
	});

	it("should render correctly", () => {
		const comp = <Carousel images={testImages} title={"Hello!"} />;
		const tree = renderer.create(comp).toJSON();
		expect(tree).toMatchSnapshot();
	});

	it("should render main image based on index (by default 0)", () => {
		expect(wrapper.find("MainImage").length).toBe(1);
		expect(wrapper.find("MainImage").prop("src")).toBe(testImages[0]);
	});

	it("should render the 2nd image, when the initial index is 1", () => {
		wrapper = shallow(<Carousel images={testImages} initial={1} />);
		expect(wrapper.find("MainImage").prop("src")).toBe(testImages[1]);
	});

	it("should render thumbnails", () => {
		expect(wrapper.find("Thumbnail").length).toBe(testImages.length);
	});

	it("should update the main image on next button", () => {
		expect(wrapper.find("MainImage").prop("src")).toBe(testImages[0]);
		wrapper.find("ThumbnailBtnRight").simulate("click");
		expect(wrapper.find("MainImage").prop("src")).toBe(testImages[1]);
	});

	it("should update the main image on clicking the previous button", () => {
		wrapper = shallow(<Carousel images={testImages} initial={1} />);
		expect(wrapper.find("MainImage").prop("src")).toBe(testImages[1]);
		wrapper.find("ThumbnailBtnLeft").simulate("click");
		expect(wrapper.find("MainImage").prop("src")).toBe(testImages[0]);
	});

	it("should render thumbnails up to maxViewable prop", () => {
		wrapper = shallow(<Carousel maxViewable={testImages.length} images={testImages} initial={0} />);
		expect(wrapper.find("Thumbnail").length).toBe(testImages.length);
		wrapper = shallow(<Carousel maxViewable={testImages.length - 1} images={testImages} initial={0} />);
		expect(wrapper.find("Thumbnail").length).toBe(testImages.length - 1);
	});

	it("should open image modal when clicking `view larger`", () => {
		const mainImage = wrapper.find("MainImage").props().src;

		expect(findModal(wrapper).length).toBe(0);

		wrapper.find("ViewLarger").simulate("click");

		expect(findModal(wrapper).length).toBe(1);
		expect(findModal(wrapper).props().src).toBe(mainImage);
	});

	it.only("should close the modal when clicking the close", () => {
		wrapper.unmount();
		wrapper = mount(<Carousel images={testImages} />);
		expect(findModal(wrapper).length).toBe(0);
		wrapper.find("ViewLarger").simulate("click");

		expect(findModal(wrapper).length).toBe(1);
		wrapper.find("ModalCloseBtn").simulate("click");
		expect(findModal(wrapper).length).toBe(0);
	});
});
