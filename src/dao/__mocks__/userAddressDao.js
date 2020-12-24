export const countByUserAddressIdDao = jest.fn();
countByUserAddressIdDao.mockImplementation((userAddressId, userId) => {
  if (userAddressId === 1 && userId === 1) return Promise.resolve(1);
  else if (userAddressId === 10 && userId === 10) return Promise.resolve(0);
});
