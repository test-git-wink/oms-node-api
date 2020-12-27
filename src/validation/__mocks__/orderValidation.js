export const countByOrderIdDao = jest.fn();
countByOrderIdDao.mockImplementation((x) => {
  if (x === 1) return new Promise([{ "count(*)": 1 }, {}]);
  if (x === 10) return new Promise([{ "count(*)": 0 }, {}]);
});

export const isValidOrderRequest = jest.fn();
isValidOrderRequest.mockImplementation((x) => {
  if (x.orderStatus == "cancel") return true;
  else if (x.orderStatus == "placed") return true;
  else return false;
});

export const getValidOrderItemList = jest.fn();
getValidOrderItemList.mockImplementation((x, y) => {
  return Promise.resolve(x);
});
