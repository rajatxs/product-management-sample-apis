import express from 'express'
import type { Express } from 'express'
import type { Server } from 'http'
import { SERVER_HOST, SERVER_PORT } from '../config/env'
import routes from '../routes'
import cors from '../config/cors'
import logger from '../utils/logger'

export class HttpService {
   private app?: Express = null
   private server?: Server = null

   private prepare() {
      this.app = express()
      this.app.use(express.json({ limit: '5mb' }))
      this.app.use(cors)
      this.app.use(routes);
   }

   public start(): Promise<void> {
      return new Promise((resolve, reject) => {
         if (this.app && this.server) {
            return resolve()
         }

         this.prepare()
         this.server = this.app.listen(SERVER_PORT)
         this.server.on('listening', () => {
            const host = `${SERVER_HOST}:${SERVER_PORT}`
            logger.info('http', 'server is running at %s', host)
            resolve()
         })
         this.server.on('error', (error) => {
            logger.error('http', "couldn't start server", error)
            reject(error)
         })
      })
   }

   public stop(): Promise<void> {
      return new Promise((resolve, reject) => {
         if (!this.app || !this.server) {
            return resolve()
         }

         this.server.close((error) => {
            if (error) {
               logger.error('http', "couldn't close server", error)
               reject(error)
            } else {
               this.app = null
               this.server = null
               logger.info('http', 'server is closed')
               resolve()
            }
         })
      })
   }
}
