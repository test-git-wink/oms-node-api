export const insertDeliveryDao = jest.fn();
insertDeliveryDao.mockImplementation(
  (deliveryDate, id, status, transaction) => {
    if (id == 1) return Promise.resolve(12);
    else if (id == 10) return Promise.reject();
    else return Promise.reject();
  }
);
