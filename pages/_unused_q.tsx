'use client'
import Catalog from '@/components/UI/catalog/Catalog'
import Layout from '@/components/UI/layout/Layout'
import { ProductService } from '@/services/product/product.service'
import { useQuery } from '@tanstack/react-query'
import { NextPage } from 'next'
import { useRouter, useSearchParams } from 'next/navigation'

const SearchPage: NextPage = () => {
  // const { query } = useRouter()
  const searchParams = useSearchParams()

  const { data } = useQuery({
    queryKey: ['search products', searchParams?.get('term')],
    queryFn: () =>
      ProductService.getAll({ searchTerm: searchParams?.get('term') || '' })
  })
  return (
    <Layout>
      <Catalog
        products={data?.products || []}
        title={`Поиск по запросу "${searchParams?.get('term') || ''}"`}
      />
    </Layout>
  )
}

export default SearchPage
