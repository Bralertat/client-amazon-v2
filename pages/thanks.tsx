import Heading from '@/components/UI/Heading'
import Meta from '@/components/UI/Meta'
import Layout from '@/components/UI/layout/Layout'
import { NextPage } from 'next'
import { FC } from 'react'

const ThanksPage: NextPage = () => {
  return (
    <Meta title='thanks'>
      <Layout>
        <Heading>Thanks!</Heading>
      </Layout>
    </Meta>
  )
}

export default ThanksPage


