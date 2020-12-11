/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Pool, PoolClient } from 'pg'
import { RouteItem } from '../models/RouteItem'

export class RoutesDao {
  private readonly pool: Pool

  public constructor(pool: Pool) {
    this.pool = pool
  }

  public async getAll(): Promise<RouteItem[]> {
    const query = `
      SELECT
        r.id,
        r.origin,
        r.destination,
        r.origin_latitude,
        r.origin_longitude,
        r.destination_latitude, 
        r.destination_longitude,
        r.time,
        r.price,
        r.passenger_capacity,
        r.passenger_capacity - (SELECT count(s.route_id) 
                                FROM reservation s 
                                WHERE S.route_id = r.id
                                ) AS available_capacity
      FROM 		route r
     
    `
    return await this.getRouteItems(query)
  }

  private async getRouteItems(query: string) {
    const res = await this.pool.query(query)

    const output: RouteItem[] = []
    for (let i = 0; i < res.rows.length; i++) {
      const row = res.rows[i]
      const model = RouteItem.fromRecord(row)
      output.push(model)
    }

    return output
  }
  public async createNewRoute(
    origin: string,
    destination: string,
    time: string,
    price: number,
    capacity: number
  ) {
    const client: PoolClient = await this.pool.connect()

    try {
      const res = await client.query(`
      INSERT INTO 
        route (origin, 
               destination, 
               origin_latitude, 
               origin_longitude, 
               destination_latitude, 
               destination_longitude, 
               "time", 
               price, 
               passenger_capacity
              )
      VALUES('${origin}', '${destination}', 0, 0, 0, 0, '${time}',${price} , ${capacity})`)

      return
    } finally {
      client.release()
    }
  }
  public async runSearch(limit: number, origin: string, destination: string): Promise<RouteItem[]> {
    const limitStr = limit ? `LIMIT ${limit}` : ''
    const originCond = origin ? `r.origin ILIKE '%${origin}%'` : ''
    const destinationCond = destination ? `r.destination ILIKE '%${destination}%'` : ''

    const filterConditions = () => {
      const filterClauses = [originCond, destinationCond]
      return filterClauses.filter(Boolean).join(' AND ')
    }
    const filterStr = filterConditions()
      ? `WHERE
             ${filterConditions()}`
      : ''

    const selectStr = `
    SELECT
    r.id,
    r.origin,
    r.destination,
    r.origin_latitude,
    r.origin_longitude,
    r.destination_latitude, 
    r.destination_longitude,
    r.time,
    r.price
  FROM 		route r
              `

    const assembleQuery = () => {
      const statements = [selectStr, filterStr, limitStr]
      return statements.filter(Boolean).join(' ')
    }

    return await this.getRouteItems(assembleQuery())
  }

  public async deleteRoute(id: number) {
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

  public async getRouteDetail(id: number) {
    const client: PoolClient = await this.pool.connect()

    try {
      const query = `
      SELECT
      r.id,
      r.origin,
      r.destination,
      r.origin_latitude,
      r.origin_longitude,
      r.destination_latitude, 
      r.destination_longitude,
      r.time,
      r.price
    FROM 		route r
      WHERE id = ${id}`

      return await this.getRouteItems(query)
    } finally {
      client.release()
    }
  }
}
