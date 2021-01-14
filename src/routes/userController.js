import UserService from "../service/userService";
import { isValidGetUserAddressRequest } from "../validation/commonValidation";
import { ServerError } from "../exception/exceptions";
import logger from "../config/logger";
import { responseMsgs } from "../constants/responseMsgsConst";

const userService = new UserService();

export default class UserController {
  async getUserAddress(req, res, next) {
    try {
      const userId = req.params.userId;
      const validUserId = await isValidGetUserAddressRequest(userId);
      if (validUserId) {
        const data = await userService.getUserAddress(userId);
        return res.status(200).json({
          userAddresses: data,

          message: responseMsgs.SUCCESS,
        });
      } else {
        logger.error(
          `%s UserController getUserAddress param: { %s }`,
          responseMsgs.INVALID_INPUTS,
          req.params.userId
        );
        return res.status(400).json({ message: responseMsgs.INVALID_INPUTS });
      }
    } catch (error) {
      logger.error(
        "%s OrderController getOrderRoute %s",
        responseMsgs.INVALID_INPUTS,
        error
      );
      next(new ServerError(error));
    }
  }
}
