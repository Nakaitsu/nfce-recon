import Realm from "realm";
import { PurchaseSchema } from "./schemas/purchase";

export const getRealmConnection = async () => await Realm.open({
  path: "nfce-recon",
  schema: [PurchaseSchema]
})