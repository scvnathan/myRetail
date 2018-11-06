describe("Cart", function() {
	beforeEach(() => {
		//Note: in a real test, we could use '/product/sometestproduct'
		browser.url(browser.options.baseUrl);
	});
	it("should update the cart display upon clicking Add To Cart", function() {
		const selector = '[class^="CartInventory"] > strong';
		browser.waitForExist(selector);

		expect(browser.getText(selector)).toBe("0");

		browser.click('[data-test="pdp_addToCart"]');

		expect(browser.getText(selector)).toBe("1");
	});
});
