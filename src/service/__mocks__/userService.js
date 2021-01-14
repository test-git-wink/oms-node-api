export const getUserAddress = jest.fn();
getUserAddress
  .mockResolvedValueOnce([])
  .mockRejectedValueOnce([])
  .mockRejectedValueOnce([]);

const UserService = jest.fn().mockImplementation(() => {
  return {
    getUserAddress: getUserAddress,
  };
});

export default UserService;
