import Meta from '@/components/UI/Meta'
import Catalog from '@/components/UI/catalog/Catalog'
import Layout from '@/components/UI/layout/Layout'
import { useProfile } from '@/hooks/useProfile'
import { CategoryService } from '@/services/category.services'
import { ProductService } from '@/services/product/product.services'
import { ICategory } from '@/types/category.interface'
import { IProduct } from '@/types/product.interface'
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'

const CategoryPage: NextPage<{ products: IProduct[]; category: ICategory }> = ({
  products,
  category
}) => {
  return (
    <Meta title={category.name}>
      <Layout>
        <Catalog products={products || []} title={category.name} />
      </Layout>
    </Meta>
  )
}

export const getStaticPath: GetStaticPaths = async () => {
  const categories = await CategoryService.getAll()

  const paths = categories.data.map(category => {
    return {
      params: { slug: category.slug }
    }
  })
  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { data: products } = await ProductService.getByCategory(
    params?.slug as string
  )
  const { data: category } = await CategoryService.getBySlug(
    params?.slug as string
  )
  return {
    props: {
      products,
      category
    }
  }
}

export default CategoryPage
