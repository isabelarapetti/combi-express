'use strict'
import express from 'express'
import HttpStatus from 'http-status-codes'
import { User } from '../service/models/user'
import { validateLogin } from '../validations'
import { UserService } from '../service/userService'
import { JWTFactory } from '../utils/jwtFactory'

const router = express.Router()
const asyncHandler = require('express-async-handler')

router.post(
  '/',
  validateLogin,
  asyncHandler(async (req: express.Request, res: express.Response) => {
    const { username, password } = req.body

    const userService = new UserService()

    const user: User = await userService.getUserByCredentials(username, password)

    if (!user) {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).json('Usuario o contraseña incorrectos')
    } else {
      const payload = {
        id: user.id,
        username: user.username,
        ip: req.ip,
        permissions: user.permissions
      }
      const token: string = JWTFactory.createJWTToken(payload)

      const response = {
        token: token,
        permissions: user.permissions
      }

      res.set('auth', token).status(HttpStatus.OK).json(response)
    }
  })
)
router.post(
  '/register',
  validateLogin,
  asyncHandler(async (req: express.Request, res: express.Response) => {
    const { username, password } = req.body
    const userService = new UserService()

    const user: User = await userService.getUserByUsername(username)

    if (!user) {
      const newUser: User = await userService.createNewUser(username, password)

      res.status(HttpStatus.OK).json(`Usuario ${newUser.username} registrado exitosamente`)
    }
    res.status(HttpStatus.UNPROCESSABLE_ENTITY).json('Usuario no válido')
  })
)

export default router
