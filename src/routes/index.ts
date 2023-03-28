import { Router } from 'express'
import supplierRoutes from './supplier'
import productRoutes from './products'

const router = Router()

router.use('/supplier', supplierRoutes);
router.use('/products', productRoutes);

router.get('/ping', (req, res) => {
   res.send({ msg: 'Pong!' })
})

export default router
