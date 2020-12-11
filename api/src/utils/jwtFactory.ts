import * as jwt from 'jsonwebtoken'
import { Request, Response } from 'express'
import config from '../config'
import HttpStatus from 'http-status-codes'

export class JWTFactory {
  public static createJWTToken(payload: any): string {
    const { expiresIn, jwtSecret } = config.jwt
    const jwtOptions = { expiresIn: expiresIn }
    const token: string = jwt.sign(payload, jwtSecret, jwtOptions)

    return token
  }

  public static validateToken(req: Request, res: Response) {
    try {
      const token = <string>req.headers['auth']
      const { jwtSecret } = config.jwt

      if (!token) this.handleError(res, new Error('Token must be provided'))

      const jwtPayload = <any>jwt.verify(token, jwtSecret)
      if (jwtPayload.ip !== req.ip) this.handleError(res, new Error('IPs are different'))

      return jwtPayload
    } catch (error) {
      this.handleError(res, error)
    }
  }

  public static handleError(res: Response, error: Error) {
    res.status(HttpStatus.UNAUTHORIZED)
    throw error
  }
}
