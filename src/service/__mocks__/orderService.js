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

const OrderService = jest.fn().mockImplementation(() => {
  return { getOrders: getOrders };
});

export default OrderService;
