import pino from 'pino';

const isEdge = process.env.NEXT_RUNTIME === 'true';

const isProduction = process.env.NODE_ENV === 'production';

const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  transport: isEdge && !isProduction ? {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:standard',
      ignore: 'pid,hostname',
    },
  } : undefined,
  formatters: {
    level:(label) =>({level: label.toUpperCase()}),
  },
  timestamp: pino.stdTimeFunctions.isoTime,
})

export default logger;