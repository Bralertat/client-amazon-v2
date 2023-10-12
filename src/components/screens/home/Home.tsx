import Meta from '@/components/UI/Meta'
import Catalog from '@/components/UI/catalog/Catalog'
import { TypePaginationProducts, TypeProducts } from '@/types/product.interface'
import { FC } from 'react'

const Home: FC<TypePaginationProducts> = ({ products, length }) => {
  return (
    <Meta title='home'>
      <div>Home hello world</div>

      <Catalog products={products || []} title='Freshed Products' />
    </Meta>
  )
}

export default Home
