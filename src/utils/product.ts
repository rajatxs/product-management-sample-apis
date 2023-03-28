import { Product } from '../types'

export function attachPrices(product: Product) {
   const exchangeRates = {
      INR: 82.21,
      EURO: 0.92,
   }

   product.prices = {}
   product.prices['USD'] = Number(product.price).toFixed(2)
   product.prices['INR'] = Number(product.price * exchangeRates.INR).toFixed(2)
   product.prices['EURO'] = Number(product.price * exchangeRates.EURO).toFixed(2)

   return product
}
