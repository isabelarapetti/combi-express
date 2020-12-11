import to from 'await-to-js'
import { Pool } from 'pg'
import config from '../config'
import { RoutesDao } from './data/routesDao'
import { RouteItem } from './models/RouteItem'

export class RoutesService {
  private readonly dao: RoutesDao

  public constructor() {
    const pool = new Pool(config.postgresPoolConfig)
    this.dao = new RoutesDao(pool)
  }

  public async getAllroutes(): Promise<RouteItem[]> {
    const [err, output] = await to(this.dao.getAll())
    if (err) throw err

    return output
  }
  public async filterAndSearch(
    limit: number,
    origin: string,
    destination: string
  ): Promise<RouteItem[]> {
    const [err, output] = await to(this.dao.runSearch(limit, origin, destination))
    if (err) throw err

    return output
  }

  public async createNewRoute(
    origin: string,
    destination: string,
    time: string,
    price: number,
    capacity: number
  ) {
    const [err] = await to(this.dao.createNewRoute(origin, destination, time, price, capacity))
    if (err) throw err

    return
  }

  public async deleteRoute(
    id: number,
  ) {
    const [err] = await to(this.dao.deleteRoute(id))
    if (err) throw err

    return
  }

  public async getRouteDetail(routeId: number): Promise<RouteItem> {
    const [err, output]= await this.dao.getRouteDetail(routeId)
    if (err) throw err
    
    return output
  }
}
