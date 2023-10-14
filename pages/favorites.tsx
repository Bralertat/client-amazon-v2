import Meta from '@/components/UI/Meta'
import Catalog from '@/components/UI/catalog/Catalog'
import Layout from '@/components/UI/layout/Layout'
import { useProfile } from '@/hooks/useProfile'
import { NextPageAuth } from '@/providers/auth-provider/auth-page.types'

const FavoritesPage: NextPageAuth = () => {
  const { profile } = useProfile()
  return (
    <Meta title='favorites'>
      <Layout>
        <Catalog products={profile?.favorites || []} title='favorites' />
      </Layout>
    </Meta>
  )
}

FavoritesPage.isOnlyUser = true

export default FavoritesPage
