import type { ResultSetHeader } from 'mysql2'
import { Supplier, SupplierDetails } from '../types'
import { mysql } from '../utils/mysql'

export class SupplierService {

   /**
    * Returns supplier record by given `id`
    * @param id - Supplier id
    */
   public getById(id: number): Promise<Supplier> {
      return new Promise((resolve, reject) => {
         const sql = 'SELECT * FROM suppliers WHERE id = ? LIMIT 1;'

         mysql().query(sql, [id], (error, results) => {
            if (error) {
               reject(error)
            } else {
               if (Array.isArray(results) && results.length > 0) {
                  resolve(results[0] as Supplier)
               } else {
                  resolve(null)
               }
            }
         })
      })
   }

   /**
    * Returns supplier record by given `email`
    * @param email - Supplier email
    */
   public getByEmail(email: string): Promise<Supplier> {
      return new Promise((resolve, reject) => {
         const sql = 'SELECT * FROM suppliers WHERE email = ? LIMIT 1;'

         mysql().query(sql, [email], (error, results) => {
            if (error) {
               reject(error)
            } else {
               if (Array.isArray(results) && results.length > 0) {
                  resolve(results[0] as Supplier)
               } else {
                  resolve(null)
               }
            }
         })
      })
   }

   /**
    * Returns public details of supplier by given `id`
    * @param id - Supplier id
    */
   public getDetailsById(id: number): Promise<SupplierDetails> {
      return new Promise((resolve, reject) => {
         const sql = 'SELECT id, email, name, phone, address FROM suppliers WHERE id = ? LIMIT 1;'

         mysql().query(sql, [id], (error, results) => {
            if (error) {
               reject(error)
            } else {
               if (Array.isArray(results) && results.length > 0) {
                  resolve(results[0] as Supplier)
               } else {
                  resolve(null)
               }
            }
         })
      })
   }

   /**
    * Adds new record into supplier table 
    * @param data - Supplier data
    */
   public register(data: Supplier): Promise<ResultSetHeader> {
      return new Promise((resolve, reject) => {
         const sql = 'INSERT INTO suppliers (name, email, password_hash, phone, address) VALUES (?, ?, ?, ?, ?)'
         const params = [data.name, data.email, data.password_hash, data.phone, data.address]

         mysql().query(sql, params, (error, results) => {
            if (error) {
               reject(error)
            } else {
               resolve(results as ResultSetHeader)
            }
         })
      })
   }
}
