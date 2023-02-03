import Layout from '@/Layout'
import React from 'react'
import {BsArrowRight} from 'react-icons/bs'
import ServCard from './ServCard'

const chooseService = () => {
  return (
    <Layout bg=''>
      <div className='bg-bg w-screen h-screen '>

        <div className='flex flex-row pt-10 pb-2 px-6'>
          <h2 className=' text-2xl text-white font-medium'>
            Service Categories
          </h2>
        </div>

        <div className='flex flex-col px-6 py-2 md:flex-row md:px-3 md:py-2'>

          <ServCard title="Token To Token Transfer" description="Create a token to token transfer"/>

          <ServCard title="NFT To Token Transfer" description="Create a NFT to token transfer"/>

          <ServCard title="ETH To Token Transfer" description="Create a ETH to token transfer"/>

        </div>
      
      </div>
    </Layout>
  )
}

export default chooseService