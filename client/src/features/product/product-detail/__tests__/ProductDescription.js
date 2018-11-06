import React from "react";
import ProductDescription from "~root/features/product/product-detail/ProductDescription"
import renderer from "react-test-renderer";

describe("ProductDescription component", () => {
  it("Test render correctly", () => {
    const comp = <ProductDescription features={["Feature 1", "Feature 2"]}/>
    const tree = renderer.create(comp).toJSON();
    expect(tree).toMatchSnapshot();
  });
});