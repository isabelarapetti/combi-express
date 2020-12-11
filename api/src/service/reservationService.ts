import to from 'await-to-js'
import { Pool } from 'pg'
import config from '../config'
import { ReservationDao } from './data/reservationDao'
// import { ReservationItem } from './models/ReservationItem'

export class ReservationService {
  private readonly dao: ReservationDao

  public constructor() {
    const pool = new Pool(config.postgresPoolConfig)
    this.dao = new ReservationDao(pool)
  }

  // public async getAll(): Promise<ReservationItem[]> {
  //   const [err, output] = await to(this.dao.getAll())
  //   if (err) throw err

  //   return output
  // }

  public async createReservation(routeId: number, userId: number) {
    const [err] = await to(this.dao.createReservation(routeId, userId))
    if (err) throw err

    return
  }

  public async deleteReservation(id: number) {
    const [err] = await to(this.dao.deleteReservation(id))
    if (err) throw err

    return
  }
}
