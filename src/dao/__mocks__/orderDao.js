export const countByOrderIdDao = jest.fn();
countByOrderIdDao.mockImplementation((id) => {
  if (id === 1) return Promise.resolve(1);
  else if (id === 10) Promise.resolve(0);
  else return Promise.reject();
});
