import HttpStatus from 'http-status-codes'
import { Request, Response, NextFunction } from 'express'
import { UserService } from '../service/userService'
import { JWTFactory } from '../utils/jwtFactory'
const asyncHandler = require('express-async-handler')

export const checkPermissions = (permissions: Array<string>) => {
  return asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    if (!permissions || !permissions.length) next()

    const jwtPayload: any = JWTFactory.validateToken(req, res)

    //Get the user ID from previous midleware
    const id = jwtPayload.id

    // Very user exists
    const user = await new UserService().getUserByIdentityId(id)

    //Check if array of authorized roles includes the user's role
    for (const permission of permissions) {
      if (user.permissions[permission]) {
        next()
        return
      }
    }

    res.status(HttpStatus.FORBIDDEN)
    throw new Error("You don't have permission to access")
  })
}
