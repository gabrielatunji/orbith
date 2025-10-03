import DomainCard from '@/components/DomainCard'
import Dropdown from '@/components/Dropdown'
import SearchBar from '@/components/SearchBar'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { domains, marketStats } from '@/constants'
import Image from 'next/image'
import React from 'react'

const Home = () => {
  return (
    <section className='home'>
        <h3 className='text-3xl font-bold'>Discover</h3>

        <div className='my-5 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5'>
            {marketStats.map((stats) => (
                <Card key={stats.id} className='flex flex-col gap-4 bg-[#161618] border-[#2A2A2D] cursor-pointer'>
                    <CardHeader className='flex items-center justify-between'>
                        <Image 
                         height={20}
                         width={28}
                         src={stats.imgURL}
                         alt={stats.detail}
                         className='w-6 h-6'
                        />

                        <p className='text-[#22C55E] text-sm font-semibold'>{stats.percent}</p>
                    </CardHeader>

                    <CardContent>
                        <h4 className='font-bold text-3xl'>{stats.totalNo}</h4>
                    </CardContent>

                    <CardFooter>
                        <p className='text-[#6B7280] text-sm'>{stats.detail}</p>
                    </CardFooter>
                </Card>
            ))}
        </div>

        <div className='flex flex-wrap md:flex-nowrap items-center gap-4'>
            <Dropdown  />
            <SearchBar />
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 mt-5">
            {domains.map((domain) => (
                <DomainCard key={domain.id} domain={domain} />
            ))}
        </div>
    </section>
  )
}

export default Home