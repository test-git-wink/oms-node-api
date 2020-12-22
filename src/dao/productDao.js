import Product from "../model/product";

export async function findProductByIdDao(productId) {
  let data = await Product.findByPk(productId);
  if (data == null) {
    return null;
  } else return data.dataValues;
}

export async function findProductPriceByIdDao(productId) {
  let data = await Product.findByPk(productId, {
    attributes: ["productSellPrice"],
  });
  if (data == null) {
    return null;
  } else return data.dataValues.productSellPrice;
}

export async function updateProductQuantityByIdDao(productId, quantity) {
  let data = await Product.decrement("inStockQuantiy", {
    by: quantity,
    where: { productId: productId },
  });

  return data[1];
}
