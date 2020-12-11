export class RouteItem {
  public id: number
  public origin: string
  public destination: string
  public origin_latitude: number
  public origin_longitude: number
  public destination_latitude: number
  public destination_longitude: number
  public time: Date
  public price: number
  public passenger_capacity: number
  public available_capacity: number

  public constructor(init?: Partial<RouteItem>) {
    Object.assign(this, init)
  }

  public static fromRecord(row: any) {
    const model = new RouteItem({
      id: row.id,
      origin: row.origin,
      destination: row.destination,
      origin_latitude: row.origin_latitude,
      origin_longitude: row.origin_longitude,
      destination_latitude: row.destination_latitude,
      destination_longitude: row.destination_longitude,
      time: row.time,
      price: row.price,
      passenger_capacity: row.passenger_capacity,
      available_capacity: row.available_capacity
    })

    return model
  }
}
