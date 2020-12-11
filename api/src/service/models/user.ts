export class User {
  public id: number
  public username: string
  public password: string
  public permissions: any

  public constructor(init?: Partial<User>) {
    Object.assign(this, init)
  }
}
