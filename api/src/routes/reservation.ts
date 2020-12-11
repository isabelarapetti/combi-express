'use strict'
import express from 'express'
import HttpStatus from 'http-status-codes'
import { ReservationService } from '../service/reservationService'
import { checkJwt } from '../middlewares/checkJwt'
import { checkPermissions } from '../middlewares/checkPermissions'
import { JWTFactory } from '../utils/jwtFactory'

const router = express.Router()
const asyncHandler = require('express-async-handler')

// router.get(
//   '/getall',
//   [checkJwt, checkPermissions(['ADMIN', 'PASSENGER'])],
//   asyncHandler(async (req: express.Request, res: express.Response) => {
//     const service = new ReservationService()

//     const items = await service.getAllReservations()

//     res.status(HttpStatus.OK).json(items)
//   })
// )
router.post(
  '/create',
  [checkJwt, checkPermissions(['ADMIN'])],
  asyncHandler(async (req: express.Request, res: express.Response) => {
    const jwtPayload: any = JWTFactory.validateToken(req, res)
    const userId = jwtPayload.id
    
    const { routeId } = req.body
    const service = new ReservationService()

    await service.createReservation(routeId, userId)

    res.status(HttpStatus.OK).json('reserva agendada')
  })
)

// router.post(
//   '/delete',
//   [checkJwt, checkPermissions(['ADMIN'])],
//   asyncHandler(async (req: express.Request, res: express.Response) => {
//     const { id } = req.body
//     const service = new ReservationService()

//     await service.deleteReservation(id)

//     res.status(HttpStatus.OK).json('routa eliminada')
//   })
// )

export default router
