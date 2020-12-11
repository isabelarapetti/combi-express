import {User} from './user'
import {RouteItem} from './RouteItem'
export class ReservationItem {
  public user: User
  public route: RouteItem

  public constructor(init?: Partial<ReservationItem>) {
    Object.assign(this, init)
  }

  public static fromRecord(row: any) {
    const model = new ReservationItem({
      user: new User({
        id: row.id,
        username: row.username
      }),
      route: new RouteItem({
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
    })

    return model
  }
}
