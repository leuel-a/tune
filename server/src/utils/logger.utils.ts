import pino from 'pino'

// this is a logger using the pino library
export const logger = pino({
  level: 'debug',
  transport: {
    target: 'pino-pretty'
  }
})
