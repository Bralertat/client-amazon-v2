'use client'


import Layout from '@/app/layout'
import Catalog from '@/components/UI/catalog/Catalog'
import { useProfile } from '@/hooks/useProfile'

interface IFavorites {}

export default function Favorites({}: IFavorites) {
  const { profile } = useProfile()
  return (
    <Layout>
      <Catalog products={profile?.favorites || []} title='Favorites' />
    </Layout>
  )
}
