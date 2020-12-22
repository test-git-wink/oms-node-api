import Delivery from "../model/delivery";
import { getDeliveryDate } from "../util/orderUtil";

export async function insertDeliveryDao(
  deliveryDate,
  userAddressId,
  deliveryStatus
) {
  let delivery = await Delivery.create(
    {
      deliveryDate: getDeliveryDate(),
      userAddressId: userAddressId,
      deliveryStatus: deliveryStatus,
    },

    { isNewRecord: true }
  );
  return delivery.deliveryId;
}

export async function insertDeliveryDao2(
  deliveryDate,
  userAddressId,
  deliveryStatus
) {
  let mysqlPoolPromise = mysqlPool.promise();

  await mysqlPoolPromise.query(
    INSERT_DELIVERY2,
    [
      { delivery_date: deliveryDate },
      { user_address_id: userAddressId },
      { delivery_status: deliveryStatus },
    ],
    function (error, results, fields) {
      if (error) throw error;
      console.log(results.insertId);
      return results.insertId;
    }
  );
}
