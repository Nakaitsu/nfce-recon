export const PurchaseSchema = {
  name: "Purchase",
  primaryKey: "_id",
  properties: {
    _id: "int",
    place: "string",
    items: [{
      desc: "string",
      unType: "string",
      val: "float",
      qtd: "float"
    }],
    date: "date"
  }
}