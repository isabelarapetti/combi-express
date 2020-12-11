'use strict'
import express from 'express'
import HttpStatus from 'http-status-codes'
const logger = require('log')

export const validateLogin = (req: express.Request, res: express.Response, next: any) => {
  logger.debug('validateLogin method')

  const errors = []

  const { username, password } = req.body

  if (!username || !password) {
    errors.push('usuario y contraseña son requeridos.')
  }

  validateErrors(errors, res, next)
}

const validateErrors = (errors: string[], res: express.Response, next: any): any => {
  logger.debug({ errors })
  if (errors.length > 0) {
    logger.error('Validate errors:', errors)
    return res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({ errors })
  }
  next()
}
