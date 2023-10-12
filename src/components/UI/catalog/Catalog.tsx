import { FC } from 'react'
import { IProduct } from '@/types/product.interface'
import ProductItem from './product-item/ProductItem'
import Loader from '../Loader'
import Heading from '../Heading'

interface ICatalog {
  products: IProduct[]
  isLoading?: boolean
  title?: string
}

const Catalog: FC<ICatalog> = ({ products, isLoading, title }) => {
  console.log('products', products)
  if (isLoading) return <Loader />
  return (
    <section>
      {title && <Heading>{title}</Heading>}
      {products.length ? (
        products.map(product => (
          <ProductItem key={product.id} product={product} />
        ))
      ) : (
        <div>There no product</div>
      )}
    </section>
  )
}

export default Catalog
