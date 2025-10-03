import React from 'react'
import { Card, CardContent, CardHeader } from './ui/card'
import Image from 'next/image'
import { Domain } from '@/types'
import { Button } from './ui/button';
import Link from 'next/link';

interface ListingCardProps {
    domain: Domain;
}

const Listing = ({ domain }: ListingCardProps) => {
  return (
    <Card className='flex flex-col gap-4 bg-[#161618] border-[#2A2A2D]'>
        <CardHeader>
            <h4 className='font-bold text-xl'>Current Listing</h4>
        </CardHeader>

        <CardContent className='flex flex-col gap-5'>
            <div className='text-[#9CA3AF] text-sm flex flex-col gap-2'>
                <p>25 fractions available</p>

                <h3 className='text-3xl text-white font-bold'>0.5 ETH <span className='text-sm text-[#9CA3AF]'>per fraction</span></h3>

                <p>Total: 12.5 ETH</p>
            </div>

            <div className='flex flex-col gap-3'>
                <Button asChild variant="blue" className='w-full'>
                    <Link href="/">
                        Contact Owner
                    </Link>
                </Button>

                <Button asChild variant="gray_outline" className='w-full'>
                    <Link href="/">
                        Make Offer
                    </Link>
                </Button>

                <div className='flex items-center w-full justify-between'>
                    <Button asChild variant="gray_outline" className='w-[45%]'>
                        <Link href="/">
                            <Image 
                              width={16}
                              height={16}
                              alt='Share'
                              src="/icons/share.svg"
                            />
                        </Link>
                    </Button>

                    <Button asChild variant="gray_outline" className='w-[45%]'>
                        <Link href="/">
                            <Image 
                              width={16}
                              height={16}
                              alt='Like'
                              src="/icons/like.svg"
                            />
                        </Link>
                    </Button>
                </div>
            </div>
        </CardContent>
    </Card>
  )
}

export default Listing