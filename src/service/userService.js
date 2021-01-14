import { findUserAddressByUserIdDao } from "../dao/userAddressDao";

export default class UserService {
  async getUserAddress(userId) {
    const result = await findUserAddressByUserIdDao(userId);
    return result;
  }
}
