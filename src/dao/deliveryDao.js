import Delivery from "../model/delivery";
import { getDeliveryDate } from "../util/orderUtil";

const UPDATE_DELIVERY_STATUS = `Update delivery  set delivery_status=? where delivery_id=? and user_address_id=?`;

export async function insertDeliveryDao(
  deliveryDate,
  userAddressId,
  deliveryStatus,
  transaction
) {
  let delivery = await Delivery.create(
    {
      deliveryDate: getDeliveryDate(),
      userAddressId: userAddressId,
      deliveryStatus: deliveryStatus,
    },

    { isNewRecord: true, transaction: transaction }
  );
  return delivery.deliveryId;
}

export async function updateDeliveryStatusDao(status, deliveryId, userId) {
  const results = await sequelize.query(UPDATE_DELIVERY_STATUS, {
    replacements: [status, deliveryId, userId],
    type: QueryTypes.UPDATE,
  });

  const count = results[1];

  return count;
}
