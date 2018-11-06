describe("Carousel", function() {
	beforeEach(() => {
		browser.url(browser.options.baseUrl);
	});

	it("should display a main image", function() {
		const baseCarouselSel = '[data-test="carousel"]';
		const selector = `${baseCarouselSel} > [class^="Carousel__MainImage"]`;
		browser.waitForExist(selector);

		const orginalSrc = browser.getAttribute(selector, "src");
		expect(orginalSrc.length).not.toBe(0);
	});

	it("left and right control buttons should change main image", () => {
		const baseCarouselSel = '[data-test="carousel"]';
		const rightBtnSel = `${baseCarouselSel} [data-test="thumbnailBtnRight"]`;
		const mainImgSel = `${baseCarouselSel} > [class^="Carousel__MainImage"]`;
		const leftBtnSel = `${baseCarouselSel} [data-test="thumbnailBtnLeft"]`;
		browser.waitForExist(mainImgSel);

		const originalSrc = browser.getAttribute(mainImgSel, "src");

		browser.click(rightBtnSel);
		expect(browser.getAttribute(mainImgSel, "src")).not.toBe(originalSrc);
		browser.click(leftBtnSel);
		expect(browser.getAttribute(mainImgSel, "src")).toBe(originalSrc);
	});
});
