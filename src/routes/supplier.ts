import { Router } from 'express'
import { SupplierController } from '../controllers/supplier.controller'

const supplierController = new SupplierController
const router = Router()

router.get('/:id', supplierController.getDetails.bind(supplierController))
router.post('/register', supplierController.registerNewSupplier.bind(supplierController))
router.post('/token', supplierController.generateToken.bind(supplierController))

export default router
