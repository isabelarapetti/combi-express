'use strict'
import express from 'express'
import createError from 'http-errors'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import authenticationRouter from './routes/authentication'
import routesRouter from './routes/routes'
import reservationRouter from './routes/reservation'
import bodyParser from 'body-parser'
import cors from 'cors'
import HttpStatus from 'http-status-codes'

const app: any = express()
const prefix = '/api/'

app.use(cors())
app.use(helmet())
app.use(bodyParser.json())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

app.use(`${prefix}authentication`, authenticationRouter)
app.use(`${prefix}routes`, routesRouter)
app.use(`${prefix}reservation`, reservationRouter)
// catch 404
app.use(function (_req: any, _res: any, next: any) {
  next(createError(404))
})

// error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use(function (err: any, req: any, res: any, next: any) {
  const statusCode = res.statusCode && res.statusCode !== HttpStatus.OK ? res.statusCode : 500
  res.status(statusCode).json(err.message).send()
})

export default app
