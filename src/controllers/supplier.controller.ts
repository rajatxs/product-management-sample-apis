import { Request, Response } from 'express'
import { SupplierService } from '../services/supplier.service'
import bcrypt from 'bcryptjs'
import logger from '../utils/logger'
import { generateAuthToken } from '../utils/jwt'
import { Supplier } from 'index'

const NAMESPACE = 'supplier:controller'

export class SupplierController {
   private supplierService = new SupplierService()

   /** Sends public details of supplier by given supplier id */
   public async getDetails(req: Request, res: Response) {
      const id = Number(req.params.id)

      try {
         const details = await this.supplierService.getDetailsById(id)

         if (!details) {
            return res.status(404).json({
               message: "Supplier not found"
            })
         }

         return res.status(200).json({ result: details })
      } catch (error) {
         const message = "Couldn't get supplier details"

         logger.error(NAMESPACE, message, error)
         return res.status(500).json({ message })
      }
   }

   /** Creates a new account of supplier */
   public async registerNewSupplier(req: Request, res: Response) {
      const { name, email, password, phone, address } = req.body

      try {
         const password_hash = await bcrypt.hash(password, 10)
         const result = await this.supplierService.register({
            name,
            email,
            password_hash,
            phone,
            address,
         })
         const id = result.insertId

         res.status(201).json({
            message: 'Supplier registered',
            result: { id },
         })
      } catch (error) {
         let message: string
         let status: number

         if (error.code === 'ER_DUP_ENTRY') {
            status = 400
            message = 'Supplier is already registered with this email'
         } else {
            status = 500
            message = "Couldn't register supplier"
            logger.error(NAMESPACE, message, error)
         }

         res.status(status).json({ message })
      }
   }

   /** Compute new auth token for supplier */
   public async generateToken(req: Request, res: Response) {
      const { email, password } = req.body
      let password_hash: string
      let supplier: Supplier

      try {
         supplier = await this.supplierService.getByEmail(email)
      } catch (error) {
         const message = "Couldn't get supplier data"

         logger.error(NAMESPACE, message, error)
         return res.status(500).json({ message })
      }

      if (!supplier) {
         return res.status(404).json({
            message: 'Supplier not found',
         })
      }

      password_hash = supplier.password_hash

      try {
         if (await bcrypt.compare(password, password_hash)) {
            const token = generateAuthToken(supplier.id)
            res.status(200).json({ message: 'Auth token generated', result: { supplier, token } })
         } else {
            res.status(400).json({ message: 'Invalid password' })
         }
      } catch (error) {
         return res.status(500).json({
            message: "Couldn't generate token",
         })
      }
   }
}
