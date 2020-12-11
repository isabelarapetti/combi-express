
export class JwtPayload {
  public id: number
  public username: string
  public ip: string
  public permissions: any

  public constructor(init?: Partial<JwtPayload>) {
    Object.assign(this, init)
  }
}
