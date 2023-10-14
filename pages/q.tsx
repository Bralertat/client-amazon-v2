import Meta from '@/components/UI/Meta'
import Catalog from '@/components/UI/catalog/Catalog'
import Layout from '@/components/UI/layout/Layout'
import { ProductService } from '@/services/product/product.services'
import { useQuery } from '@tanstack/react-query'
import { NextPage } from 'next'
import { useRouter } from 'next/router'

const SearchPage: NextPage = () => {
  const { query } = useRouter()

  const { data } = useQuery(['search products', query.term], () =>
    ProductService.getAll({ searchTerm: query.term as string })
  )
  return (
    <Meta title='Search'>
      <Layout>
        <Catalog
          products={data?.products || []}
          title={`Поиск по запросу "${query.term || ''}"`}
        />
      </Layout>
    </Meta>
  )
}

export default SearchPage
