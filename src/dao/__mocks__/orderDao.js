import { OrderStatusConst } from "../../constants/orderStatus";

export const countByOrderIdDao = jest.fn();
countByOrderIdDao.mockImplementation((id) => {
  if (id === 1) return Promise.resolve(1);
  else if (id === 10) Promise.resolve(0);
  else return Promise.reject();
});

export const orderDataDao = jest.fn();
orderDataDao.mockResolvedValue(Promise.resolve([]));

export const orderStatusByIdDao = jest.fn();
orderStatusByIdDao.mockImplementation((id) => {
  if (id == 1) return Promise.resolve(OrderStatusConst.APPROVED);
  else if (id == 100) return Promise.resolve(OrderStatusConst.FAIL);
  else return Promise.reject();
});

export const updateOrderStatusDao = jest.fn();
updateOrderStatusDao.mockImplementation((status, id) => {
  if (id === 1) return Promise.resolve(1);
  else if (id === 10) return Promise.resolve(0);
  else return Promise.reject();
});

export const insertOrderDao2 = jest.fn();
insertOrderDao2.mockResolvedValue(23);
