import type { Metadata } from 'next'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'
import Heading from '@/components/UI/Heading'
import Layout from '@/components/UI/layout/Layout'


export const metadata: Metadata = {
  title: 'Thanks',
  ...NO_INDEX_PAGE
}

export default function ThanksPage() {
  return (
    <Layout>
      <Heading>Thanks!</Heading>
    </Layout>
  )
}
