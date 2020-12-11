import { Pool } from 'pg'
import { UserDao } from './data/userDao'
import config from '../config'
import { User } from './models/user'

export class UserService {
  private readonly _userDao: UserDao
  public constructor() {
    const pgPool = new Pool(config.postgresPoolConfig)
    this._userDao = new UserDao(pgPool)
  }
  public async getUserByCredentials(username: string, password: string): Promise<User> {
    const user = await this._userDao.getUserByCredentials(username, password)
    return user
  }

  public async createNewUser(username: string, password: string): Promise<User> {
    const user = await this._userDao.createNewUser(username, password)
    return user
  }

  public async getUserByUsername(username: string): Promise<User> {
    const user = await this._userDao.getUserByUsername(username)
    return user
  }

  public async getUserByIdentityId(identityId: number): Promise<User> {
    const user = await this._userDao.getUserByIdentityId(identityId)
    return user
  }
}
