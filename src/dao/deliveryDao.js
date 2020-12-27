import Delivery from "../model/delivery";
import { getDeliveryDate } from "../util/orderUtil";

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
