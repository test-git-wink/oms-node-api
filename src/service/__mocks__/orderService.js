export const getOrders = jest.fn();
getOrders.mockImplementation((fromDate, toDate, page, limit) => {
  if (
    fromDate == "2020-12-01" &&
    toDate == "2020-12-31" &&
    page == "1000000000000000000000" &&
    limit == "10"
  )
    return Promise.reject([]);
  else return Promise.resolve([]);
});

export const cancelOrder = jest.fn();
cancelOrder.mockImplementation((orderId, updateReq) => {
  if (orderId == 11) return Promise.reject(0);
  else if (orderId == 1) return Promise.resolve(1);
  else if (orderId == 101) return Promise.reject(0);
  else return Promise.resolve(1);
});

export const placeOrder = jest.fn();
placeOrder
  .mockResolvedValueOnce(56)
  .mockRejectedValueOnce(57)
  .mockRejectedValueOnce(0);

const OrderService = jest.fn().mockImplementation(() => {
  return {
    getOrders: getOrders,
    cancelOrder: cancelOrder,
    placeOrder: placeOrder,
  };
});

export default OrderService;
