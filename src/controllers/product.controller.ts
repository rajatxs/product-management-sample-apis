import { Request, Response } from 'express'
import { Product } from 'index'
import { ProductService } from '../services/product.service'
import { attachPrices } from '../utils/product'
import logger from '../utils/logger'

const NAMESPACE = 'product:controller'

export class ProductController {
   private productService = new ProductService()

   /** Sends product list by given optional supplier_id and limit by query params */
   public async getAllProducts(req: Request, res: Response) {
      const supplierId = Number(req.query.supplier_id)
      const limit = Number(req.query.limit) || 50

      try {
         let products: Product[]

         if (supplierId) {
            products = await this.productService.getAllBySupplierId(supplierId, limit)
         } else {
            products = await this.productService.getAll(limit)
         }

         products = products.map(product => attachPrices(product))

         return res.status(200).json({
            result: products,
         })
      } catch (error) {
         const message = "Couldn't get products"

         logger.error(NAMESPACE, message, error)
         return res.status(500).json({ message })
      }
   }

   /** Sends single product by given id */
   public async getProductById(req: Request, res: Response) {
      const id = Number(req.params.id)

      try {
         let product = await this.productService.getById(id)
         
         if (!product) {
            return res.status(404).json({ message: "Product not found" })
         }

         product = attachPrices(product)

         return res.status(200).json({ result: product })
      } catch (error) {
         const message = "Couldn't get product"

         logger.error(NAMESPACE, message, error)
         return res.status(500).json({ message })
      }
   }

   /** Insert single product with verified `supplier_id` */
   public async addProduct(req: Request, res: Response) {
      const supplier_id = Reflect.get(req, 'userId') as number
      const { name, price, sku } = req.body

      try {

         // check for unique SKU
         const validSKU = await this.productService.verifyNewSKU(sku, supplier_id)

         if (!validSKU) {
            return res.status(400).json({ message: "SKU is already in use" })
         }

         const record = await this.productService.add({
            name,
            price,
            sku,
            supplier_id,
         })

         return res.status(201).json({
            message: "Product added",
            result: {
               id: record.insertId,
            }
         })
      } catch (error) {
         const message = "Couldn't add new product"

         logger.error(NAMESPACE, message, error)
         return res.status(500).json({ message })
      }
   }

   /** Update name or price of product by specified id */
   public async updateProduct(req: Request, res: Response) {
      const supplier_id = Reflect.get(req, 'userId') as number
      const id = Number(req.params.id)
      const fields: any = {}

      // filter props with valid values
      Object.keys(req.body).forEach(prop => {
         if (!['name', 'price'].includes(prop)) {
            return;
         }

         const val = req.body[prop]
         fields[prop] = val
      })

      try {
         await this.productService.update(id, supplier_id, fields)

         return res.status(200).json({ 
            message: "Product has been updated",
         })
      } catch (error) {
         const message = "Couldn't update product"

         logger.error(NAMESPACE, message, error)
         return res.status(500).json({ message })
      }
   }

   /** Removes product by given id */
   public async deleteProduct(req: Request, res: Response) {
      const supplier_id = Reflect.get(req, 'userId') as number
      const id = Number(req.params.id)

      try {
         await this.productService.delete(id, supplier_id)

         return res.status(200).json({ 
            message: "Product has been deleted",
         })
      } catch (error) {
         const message = "Couldn't delete product"

         logger.error(NAMESPACE, message, error)
         return res.status(500).json({ message })
      }
   }
}
