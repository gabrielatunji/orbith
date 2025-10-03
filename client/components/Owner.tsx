import React from 'react'
import { Card, CardContent, CardHeader } from './ui/card'
import Image from 'next/image'
import { Domain } from '@/types'

interface OwnerCardProps {
    domain: Domain;
}

const Owner = ({ domain }: OwnerCardProps) => {
  return (
    <Card className='flex flex-col gap-4 bg-[#161618] border-[#2A2A2D]'>
        <CardHeader>
            <h4 className='font-bold text-xl'>Owner</h4>
        </CardHeader>

        <CardContent className='flex items-center gap-6'>
            <Image
              src="/icons/avatar.svg"
              height={48}
              width={48}
              alt='Owner Avatar'
            />

            <div>
                <h4>{domain.owner}</h4>
                <p className='text-[#60A5FA] flex items-center gap-2'>
                    <Image 
                      src="/icons/verified.svg"
                      height={14}
                      width={14}
                      alt='Verified Tick'
                      className='inline'
                    />
                    Verified Owner
                </p>
            </div>
        </CardContent>
    </Card>
  )
}

export default Owner