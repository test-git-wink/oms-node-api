import Product from "../model/product";

export async function findProductByIdDao(productId, transaction) {
  let data = await Product.findByPk(productId, { transaction: transaction });
  if (data == null) {
    return null;
  } else return data.dataValues;
}

export async function findProductPriceByIdDao(productId, transaction) {
  let data = await Product.findByPk(productId, {
    attributes: ["productSellPrice"],
    transaction: transaction,
  });
  if (data == null) {
    return null;
  } else return data.dataValues.productSellPrice;
}

export async function updateProductQuantityByIdDao(
  productId,
  quantity,
  transaction
) {
  let data = await Product.decrement(
    "inStockQuantiy",
    {
      by: quantity,
      where: { productId: productId },
    },
    { transaction: transaction }
  );

  return data[1];
}
