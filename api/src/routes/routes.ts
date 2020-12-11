'use strict'
import express from 'express'
import HttpStatus from 'http-status-codes'
import { RoutesService } from '../service/routesService'
import { checkJwt } from '../middlewares/checkJwt'
import { checkPermissions } from '../middlewares/checkPermissions'

const router = express.Router()
const asyncHandler = require('express-async-handler')

router.get(
  '/getall',
  [checkJwt, checkPermissions(['ADMIN', 'PASSENGER'])],
  asyncHandler(async (req: express.Request, res: express.Response) => {
    const service = new RoutesService()

    const items = await service.getAllroutes()

    res.status(HttpStatus.OK).json(items)
  })
)
router.post(
  '/create',
  [checkJwt, checkPermissions(['ADMIN'])],
  asyncHandler(async (req: express.Request, res: express.Response) => {
    const { origin, destination, time, price, capacity } = req.body
    const service = new RoutesService()

    await service.createNewRoute(origin, destination, time, price, capacity)

    res.status(HttpStatus.OK).json('routa agregada')
  })
)

router.post(
  '/delete',
  [checkJwt, checkPermissions(['ADMIN'])],
  asyncHandler(async (req: express.Request, res: express.Response) => {
    const { id } = req.body
    const service = new RoutesService()

    await service.deleteRoute(id)

    res.status(HttpStatus.OK).json('routa agregada')
  })
)

router.get(
  '/search',
  [checkJwt, checkPermissions(['PASSENGER'])],
  asyncHandler(async (req: express.Request, res: express.Response) => {
    const service = new RoutesService()
    let items
    if (Object.keys(req.query).length > 0) {
      const { origin, destination, limit } = req.query as any
      items = await service.filterAndSearch(parseInt(limit), origin, destination)
    } else {
      res
        .status(HttpStatus.UNPROCESSABLE_ENTITY)
        .json('Search criteria is incomplete, enter at least one')
    }
    res.status(HttpStatus.OK).json(items)
  })
)

router.get(
  '/:id',
  [checkJwt, checkPermissions(['PASSENGER', 'ADMIN'])],
  asyncHandler(async (req: express.Request, res: express.Response) => {
    const id = Number(req.params.id)

    const service = new RoutesService()

    const output = await service.getRouteDetail(id)

    if (output) {
      res.status(HttpStatus.OK).json(output)
    } else {
      res.status(HttpStatus.NOT_FOUND)
    }
  })
)
export default router
