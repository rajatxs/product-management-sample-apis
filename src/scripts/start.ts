import { HttpService } from '../services/http.service'
import { connectMySQLDatabase, disconnectMySQLDatabase } from '../utils/mysql'
import logger from '../utils/logger'

;(async function () {
   const server = new HttpService()

   await connectMySQLDatabase()
   await server.start()

   async function terminate() {
      try {
         await server.stop()
         await disconnectMySQLDatabase()
      } catch (error) {
         logger.error('app', 'terminating abnormally')
         process.exit(1)
      }
   }

   process.on('SIGINT', terminate)
   process.on('SIGTERM', terminate)
})()
