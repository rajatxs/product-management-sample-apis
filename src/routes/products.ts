import { Router } from 'express'
import { ProductController } from '../controllers/product.controller'
import { authTokenVerifier } from '../middlewares/auth.middleware'

const productController = new ProductController
const router = Router()

router.get('/', productController.getAllProducts.bind(productController))
router.get('/:id', productController.getProductById.bind(productController))
router.post('/', authTokenVerifier, productController.addProduct.bind(productController))
router.put('/:id', authTokenVerifier, productController.updateProduct.bind(productController))
router.delete('/:id', authTokenVerifier, productController.deleteProduct.bind(productController))

export default router
