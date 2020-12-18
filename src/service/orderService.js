import { getFromToDateRange } from "../util/dateConversion";
import { getOffset } from "../util/commonUtil";
import { orderDataDao } from "../dao/orderDao";

class OrderService {
  async getOrders(fromDate, toDate, page, pageLimit) {
    let dates = getFromToDateRange(fromDate, toDate);
    let offset = getOffset(page);
    let limit = parseInt(pageLimit);

    return await orderDataDao(
      dates["fromDate"],
      dates["toDate"],
      limit,
      offset
    );
  }
}

export default OrderService;
