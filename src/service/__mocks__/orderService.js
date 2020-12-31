export const getOrders = jest.fn();
getOrders.mockImplementation((req) => {
  if (
    req.fromDate == "2020-12-01" &&
    req.toDate == "2020-12-31" &&
    req.page == "1000000000000000000000" &&
    req.limit == "10"
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
