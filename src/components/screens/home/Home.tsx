import Meta from '@/components/UI/Meta'
import Catalog from '@/components/UI/catalog/Catalog'
import CatalogPagination from '@/components/UI/catalog/CatalogPagination'
import Layout from '@/components/UI/layout/Layout'
import { useActions } from '@/hooks/useActions'
import { useAuth } from '@/hooks/useAuth'
import { logout } from '@/store/user/user.actions'
import { TypePaginationProducts, TypeProducts } from '@/types/product.interface'
import { FC } from 'react'

const Home: FC<TypePaginationProducts> = ({ products, length }) => {
  return (
    <Meta title='home'>
      <Layout>
        <CatalogPagination
          data={{ products, length }}
          title='Freshed Products'
        />
      </Layout>
    </Meta>
  )
}

export default Home
