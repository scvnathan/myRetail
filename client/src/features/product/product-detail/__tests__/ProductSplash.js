import React from "react";
import ProductSplash from "~root/features/product/product-detail/ProductSplash"
import renderer from "react-test-renderer";
import testImages from '~root/common/__tests__/images';

describe("ProductSplash component", () => {
  it("Test render correctly", () => {
    const comp = <ProductSplash images={testImages} title={"Hello!"}/>
    const tree = renderer.create(comp).toJSON();
    expect(tree).toMatchSnapshot();
  });
});