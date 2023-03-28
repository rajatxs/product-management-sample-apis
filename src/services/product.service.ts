import { ResultSetHeader } from 'mysql2'
import { mysql } from '../utils/mysql'
import { Product } from '../types'

export class ProductService {

   /**
    * Returns all record upto given `limit`
    * @param limit - Record limit
    */
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

   /**
    * Returns all record of specified `supplierId` upto given `limit`
    * @param supplierId - Supplier Id
    * @param limit - Record limit
    */
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

   /**
    * Returns product record by given `id`
    * @param id - Product id
    */
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

   /**
    * Adds a new product into database table
    * @param data - Product data
    */
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

   /**
    * Checks whether specified `SKU` is unique or not
    * @param sku - Stock keeping unit
    * @param supplierId - Supplier id
    */
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

   /**
    * Update `name` or `price` value of product by given `id`
    * @param id - Product id
    * @param supplierId - Supplier id
    * @param fields - Product record fields
    */
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

   /**
    * Removes product record from table by given `id`
    * @param id - Product id
    * @param supplierId - Supplier id
    */
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
