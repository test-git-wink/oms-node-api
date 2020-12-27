export const findProductByIdDao = jest.fn();
findProductByIdDao.mockImplementation((id) => {
  let prod1 = {
    productId: "PROD_11223",
    productName: "white rice",
    productType: "grain",
    productSellPrice: "58",
    productBatchPrice: "60",
    inStockQuantiy: "800",
    prodMeasureUnit: "Kg",
  };
  let prod2 = {
    productId: "PROD_11224",
    productName: "white flour",
    productType: "flour",
    productSellPrice: "100",
    productBatchPrice: "100",
    inStockQuantiy: "853",
    prodMeasureUnit: "Kg",
  };
  if (id === "PROD_11224") return Promise.resolve(prod2);
  else if (id === "PROD_11223") return Promise.resolve(prod1);
  else return Promise.resolve(null);
});

export const findProductPriceByIdDao = jest.fn();
findProductPriceByIdDao.mockResolvedValue(100);

export const updateProductQuantityByIdDao = jest.fn();
updateProductQuantityByIdDao.mockResolvedValue(1);
