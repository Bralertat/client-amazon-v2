'use client'
import Catalog from '@/components/UI/catalog/Catalog'
import Layout from '@/components/UI/layout/Layout'
import { ProductService } from '@/services/product/product.service'
import { useQuery } from '@tanstack/react-query'
import { NextPage } from 'next'
import { useRouter, useSearchParams } from 'next/navigation'

const SearchPage: NextPage = () => {
  // const { query } = useRouter()
  // const query = useSearchParams()

  const { data } = useQuery({
    queryKey: ['search products', query.term],
    queryFn: () => ProductService.getAll({ searchTerm: query.term as string })}
  )
  return (

      <Layout>
        <Catalog
          products={data?.products || []}
          title={`Поиск по запросу "${query.term || ''}"`}
        />
      </Layout>

  )
}

export default SearchPage
