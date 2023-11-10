'use client'


import Catalog from '@/components/UI/catalog/Catalog'
import Layout from '@/components/UI/layout/Layout'
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
