'use client'

import Layout from '@/components/UI/layout/Layout'
import CatalogPagination from '@/components/UI/catalog/CatalogPagination'
import { TypePaginationProducts } from '@/types/product.interface'
import { FC } from 'react'

const Home: FC<TypePaginationProducts> = ({ products, length }) => {
  return (
      <Layout>
        <CatalogPagination
          data={{ products, length }}
          title='Freshed Products'
        />
      </Layout>
  )
}

export default Home
