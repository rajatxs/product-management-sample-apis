import { createConnection, Connection, ConnectionOptions } from 'mysql2'
import { MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PSWD, MYSQL_DB } from '../config/env'
import logger from './logger'

var db: Connection

/** Returns MySQL Database instance */
export function mysql() {
   if (!db) {
      connectMySQLDatabase()
   }
   return db
}

/** Opens new connection with MySQL Database */
export function connectMySQLDatabase(): Promise<void> {
   return new Promise(function (resolve, reject) {
      if (db) {
         return resolve()
      }

      const config: ConnectionOptions = {
         host: MYSQL_HOST,
         port: MYSQL_PORT,
         user: MYSQL_USER,
         password: MYSQL_PSWD,
         database: MYSQL_DB,
         multipleStatements: true,
      }

      db = createConnection(config)
      db.on('connect', () => {
         logger.info('mysql', 'connected at %s:%d', MYSQL_HOST, MYSQL_PORT)
         resolve()
      })
      db.on('error', function (error: Error) {
         logger.error('mysql', error)
         reject(error)
      })
   })
}

/** Closes the active database connection */
export function disconnectMySQLDatabase(): Promise<void> {
   return new Promise((resolve, reject) => {
      if (!db) {
         return resolve()
      }

      db.end((err) => {
         if (err) {
            logger.error('mysql', err)
            return reject(err)
         }

         logger.info('mysql', 'disconnected')

         db = null
         resolve()
      })
   })
}
