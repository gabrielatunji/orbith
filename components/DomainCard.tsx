import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from './ui/card'
import { Domain } from '@/types'
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import Link from 'next/link';

interface DomainCardProps {
    domain: Domain;
}

const DomainCard = ({ domain }: DomainCardProps) => {
  return (
    <Card className='flex flex-col gap-4 bg-[#161618] border-[#2A2A2D]'>
        <CardHeader className='flex flex-col gap-3'>
            <CardTitle className='flex justify-between items-center w-full'>
                <h4 className='font-bold text-xl'>{domain.name}</h4>
                <Badge variant="blue" className='font-semibold'>{domain.rating}/10</Badge>
            </CardTitle>

            <Badge variant="gray">{domain.domain}</Badge>
        </CardHeader>

        <CardContent className='text-[#9CA3AF] space-y-5'>
            <p className='flex justify-between'>Rarity: <span className='text-white'>{domain.rarity}%</span></p>
            <p className='flex justify-between'>Length: <span className='text-white'>{domain.length} chars</span></p>
            <p className='flex justify-between'>Age: <span className='text-white'>{domain.age} years</span></p>
            <p className='flex flex-col gap-3'>Owner <span className='text-white'>{domain.owner}</span></p>
        </CardContent>

        <hr className='w-[85%] text-[#2A2A2D] self-center' />

        <CardFooter className='flex justify-between'>
            <h4 className='text-[#9CA3AF] flex flex-col'>
                Price
                <span className='flex gap-2 items-end'>
                    <span className='text-2xl font-bold text-white'>{domain.price}</span>
                    <span>{domain.coin}</span>
                </span> 
            </h4>

            <Button asChild variant="blue_outline">
                <Link href={`/${domain.id}`}>
                    View Details
                </Link>
            </Button>
        </CardFooter>
    </Card>
  )
}

export default DomainCard