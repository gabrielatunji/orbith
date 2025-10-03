import React from 'react'
import { domains } from '@/constants'
import Link from 'next/link';
import Image from 'next/image';
import InfoCard from '@/components/InfoCard';
import Owner from '@/components/Owner';
import Listing from '@/components/Listing';

interface DomainPageProps {
  params: Promise<{
    id: string;
  }>;
}

const Domains = async ({ params }: DomainPageProps) => {

    const { id } = await params;

    const domain = domains.find((d) => d.id.toString() === id);

    if (!domain) {
        return <p className="p-6">Domain not found</p>
    }

  return (
    <section className='home'>
      <Link href="/" className='flex items-center gap-2 text-[#9CA3AF] mb-5'>
        <Image 
          width={14}
          height={16}
          src="/icons/back-arrow.svg"
          alt='Back Arrow Icon'
        />
        Back to Discover
      </Link>

      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <InfoCard domain={domain}  />

        <div className='flex flex-col justify-between gap-6'>
          <Owner domain={domain} />
          <Listing domain={domain} />
        </div>

        <div>
          <></>
          <></>
        </div>

      </div>
    </section>
  )
}

export default Domains