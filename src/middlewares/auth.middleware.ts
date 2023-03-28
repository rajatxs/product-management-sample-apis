import { Request, Response, NextFunction } from 'express'
import { verifyAuthToken } from '../utils/jwt'

export function authTokenVerifier(req: Request, res: Response, next: NextFunction) {
   const authHeader = req.headers['authorization']

   // extract the token from the header
   const token = authHeader && authHeader.split(' ')[1]

   if (!token) {
      return res.status(401).json({
         message: 'Auth token is missing',
      })
   }

   try {
      const payload = verifyAuthToken(token)
      Reflect.set(req, 'userId', Number(payload['id']))
      next()
   } catch (err) {
      return res.status(403).json({
         message: 'Token is invalid',
      })
   }
}
