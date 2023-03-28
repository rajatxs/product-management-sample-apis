import { ResultSetHeader } from 'mysql2'
import { mysql } from '../utils/mysql'
import { Product } from '../types'

export class ProductService {
   public getAll(limit: number): Promise<Product[]> {
      return new Promise((resolve, reject) => {
         const sql = 'SELECT * FROM products ORDER BY updated_at DESC LIMIT ?;'

         mysql().query(sql, [limit], (error, results) => {
            if (error) {
               reject(error)
            } else {
               if (Array.isArray(results)) {
                  resolve(results as Product[])
               } else {
                  resolve([])
               }
            }
         })
      })
   }

   public getAllBySupplierId(supplierId: number, limit: number): Promise<Product[]> {
      return new Promise((resolve, reject) => {
         const sql = 'SELECT * FROM products WHERE supplier_id = ? ORDER BY updated_at DESC LIMIT ?;'

         mysql().query(sql, [supplierId, limit], (error, results) => {
            if (error) {
               reject(error)
            } else {
               if (Array.isArray(results)) {
                  resolve(results as Product[])
               } else {
                  resolve([])
               }
            }
         })
      })
   }

   public getById(id: number): Promise<Product> {
      return new Promise((resolve, reject) => {
         const sql = 'SELECT * FROM products WHERE id = ? LIMIT 1;'

         mysql().query(sql, [id], (error, results) => {
            if (error) {
               reject(error)
            } else {
               if (Array.isArray(results) && results.length > 0) {
                  resolve(results[0] as Product)
               } else {
                  resolve(null)
               }
            }
         })
      })
   }

   public add(data: Product): Promise<ResultSetHeader> {
      return new Promise((resolve, reject) => {
         const sql = 'INSERT INTO products (name, price, sku, supplier_id) VALUES (?, ?, ?, ?);'
         const params = [data.name, data.price, data.sku, data.supplier_id]

         mysql().query(sql, params, (error, results) => {
            if (error) {
               reject(error)
            } else {
               resolve(results as ResultSetHeader)
            }
         })
      })
   }

   public verifyNewSKU(sku: string, supplierId: number): Promise<boolean> {
      return new Promise((resolve, reject) => {
         const sql = 'SELECT COUNT(id) as count FROM products WHERE SKU = ? AND supplier_id = ?;'

         mysql().query(sql, [sku, supplierId], (error, results) => {
            if (error) {
               reject(error)
            } else {
               let result: any = Array.isArray(results)? results[0]: results
               resolve(result.count === 0)
            }
         })
      })
   }

   public update(id: number, supplierId: number, fields: Pick<Product, 'name'|'price'>): Promise<ResultSetHeader> {
      return new Promise((resolve, reject) => {
         const sql = 'UPDATE products SET ? WHERE id = ? AND supplier_id = ?;'

         mysql().query(sql, [fields, id, supplierId], (error, results) => {
            if (error) {
               reject(error)
            } else {
               resolve(results as ResultSetHeader)
            }
         })
      })
   }

   public delete(id: number, supplierId: number): Promise<ResultSetHeader> {
      return new Promise((resolve, reject) => {
         const sql = 'DELETE FROM products WHERE id = ? AND supplier_id = ?;'

         mysql().query(sql, [id, supplierId], (error, results) => {
            if (error) {
               reject(error)
            } else {
               resolve(results as ResultSetHeader)
            }
         })
      })
   }
}
