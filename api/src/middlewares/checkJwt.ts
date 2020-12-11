import { Request, Response, NextFunction } from 'express'
import { JWTFactory } from '../utils/jwtFactory'

export const checkJwt = (req: Request, res: Response, next: NextFunction): any => {
  const jwtPayload: any = JWTFactory.validateToken(req, res)

  //Slide the token
  //We want to send a new token on every request
  delete jwtPayload.exp
  delete jwtPayload.iat

  const newToken: string = JWTFactory.createJWTToken(jwtPayload)

  res.locals.token = newToken
  res.setHeader('token', newToken)
  res.setHeader('Access-Control-Expose-Headers', 'token');

  //Call the next middleware or controller
  next()
}
