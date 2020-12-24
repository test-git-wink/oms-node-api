export const countByOrderIdDao = jest.fn();
// countByOrderIdDao.mockReturnValueOnce([{ "count(*)": 1 }, {}]);
countByOrderIdDao.mockImplementation((x) => {
  if (x === 1) return new Promise([{ "count(*)": 1 }, {}]);
  if (x === 10) return new Promise([{ "count(*)": 0 }, {}]);
});
