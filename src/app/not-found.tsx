import Heading from '@/components/UI/Heading';
import Layout from '@/components/UI/layout/Layout';
import Link from 'next/link';

export default function NotFound(){
  return (
    <Layout>
      <Heading>NotFound</Heading>
      <p>Could not find requested resource</p>
      <p>
        View{' '}
        <Link href='/explorer' className='text-primary'>
          all products
        </Link>
      </p>
    </Layout>
  )
}