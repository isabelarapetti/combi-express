/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Pool, PoolClient } from 'pg'
import { ReservationItem } from '../models/ReservationItem'

export class ReservationDao {
  private readonly pool: Pool

  public constructor(pool: Pool) {
    this.pool = pool
  }

  // public async getAll(): Promise<ReservationItem[]> {
  //   const query = `
  //     SELECT
  //       i.id,
  //       i.username,
  //       r.id,
  //       r.origin,
  //       r.destination,
  //       r.origin_latitude,
  //       r.origin_longitude,
  //       r.destination_latitude,
  //       r.destination_longitude,
  //       r.time,
  //       r.price,
  //       r.passenger_capacity,
  //       r.passenger_capacity - (SELECT count(s.route_id)
  //                               FROM reservation s
  //                               WHERE S.route_id = r.id
  //                               ) AS available_capacity
  //     FROM 	reservation s
  //     INNER JOIN route r
  //         ON S.route_id = r.id
  //     INNER JOIN identity i
  //          ON S.identity_id = i.id
  //   `
  //   return await this.getItems(query)
  // }

  // private async getItems(query: string) {
  //   const res = await this.pool.query(query)

  //   const output: ReservationItem[] = []
  //   for (let i = 0; i < res.rows.length; i++) {
  //     const row = res.rows[i]
  //     const model = ReservationItem.fromRecord(row)
  //     output.push(model)
  //   }

  //   return output
  // }

  public async createReservation(routeId: number, userId: number) {
    const client: PoolClient = await this.pool.connect()

    try {
      const res = await client.query(`
      INSERT INTO reservation
          (route_id, identity_id)
      VALUES(${routeId}, ${userId})`)

      return
    } finally {
      client.release()
    }
  }

  public async deleteReservation(id: number) {
    const client: PoolClient = await this.pool.connect()

    try {
      const res = await client.query(`
      DELETE FROM 
        route
      WHERE id = ${id}`)

      return
    } finally {
      client.release()
    }
  }
}
