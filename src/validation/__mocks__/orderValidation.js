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

export const isValidOrderId = jest.fn();
isValidOrderId.mockImplementation((x) => {
  if (x == 1) return true;
  if (x == 10) return false;
  if (x == 101) return true;
});

export const isValidPostOrderRequest = jest.fn();
isValidPostOrderRequest
  .mockReturnValueOnce(true)
  .mockReturnValueOnce(false)
  .mockReturnValueOnce(true);

export const isValidOrderUpdateRequest = jest.fn();
isValidOrderUpdateRequest
  .mockReturnValueOnce(true)
  .mockReturnValueOnce(false)
  .mockReturnValueOnce(true);

export const validOrderCancelRequest = jest.fn();
validOrderCancelRequest.mockReturnValueOnce(true).mockReturnValueOnce(false);
