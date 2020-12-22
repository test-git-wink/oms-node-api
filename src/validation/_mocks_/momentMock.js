export const mockMoment = jest.fn();
const mockMomentException = jest.fn().mockImplementation(() => {
  throw new Error();
});

export default mockMomentException;
