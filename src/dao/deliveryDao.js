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
