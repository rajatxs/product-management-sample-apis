import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/env'

export function generateAuthToken(supplierId: number): string {
   return jwt.sign({ id: supplierId }, JWT_SECRET, { expiresIn: '5h' })
}

export function verifyAuthToken(token: string) {
   return jwt.verify(token, JWT_SECRET);
}
