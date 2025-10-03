import React from 'react'
import { Domain } from '@/types'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import StarRating from './StarRating';

interface InfoCardProps {
    domain: Domain;
}

const InfoCard = ({ domain }: InfoCardProps) => {
  return (
    <Card className='flex flex-col gap-4 bg-[#161618] border-[#2A2A2D] col-span-2'>
        <CardHeader className='flex flex-col gap-4'>
            <CardTitle className='flex flex-row items-center gap-4'>
                <h4 className='font-bold text-3xl'>{domain.name}</h4>
                <Badge variant="blue" className='font-semibold'>{domain.rating}/10</Badge>
                <Badge variant="gray">{domain.coin}</Badge>
            </CardTitle>

            <StarRating value={(Math.floor(domain.rarity)/10 * 5)} />
            {/* <StarRating value={2} /> */}
        </CardHeader>

        <CardContent>
            <div>


                <div className='flex flex-col gap-4'>
                    <h4 className='text-xl font-bold'>Score Breakdown</h4>

                    {/* Container for each breakdown */}
                    <div className='flex flex-col gap-6'>
                        {/* Rarity */}
                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-row justify-between items-center text-sm'>
                                <p className='text-[#9CA3AF]'>Rarity Score</p>
                                <p>{domain.rarity}/100</p>
                            </div>

                            {/* Progress Bar */}
                            <div className="relative flex items-center w-full bg-gray-500/20 h-3 rounded-full">
                                <div className="bg-blue-600 h-3 rounded-full w-[85%]" style={{ width: `${domain.rarity}%` }}>
                                </div>
                            </div>
                        </div>

                        {/* Length */}
                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-row justify-between items-center text-sm'>
                                <p className='text-[#9CA3AF]'>Length Score</p>
                                <p>{(domain.length)/10 * 100}/100</p>
                            </div>

                            {/* Progress Bar */}
                            <div className="relative flex items-center w-full bg-gray-500/20 h-3 rounded-full">
                                <div className="bg-blue-600 h-3 rounded-full w-[85%]" style={{ width: `${(domain.length)/10 * 100}%` }}>
                                </div>
                            </div>
                        </div>

                        {/* Age */}
                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-row justify-between items-center text-sm'>
                                <p className='text-[#9CA3AF]'>Age Score</p>
                                <p>{(domain.age)/5 * 100}/100</p>
                            </div>

                            {/* Progress Bar */}
                            <div className="relative flex items-center w-full bg-gray-500/20 h-3 rounded-full">
                                <div className="bg-blue-600 h-3 rounded-full w-[85%]" style={{ width: `${(domain.age)/5 * 100}%` }}>
                                </div>
                            </div>
                        </div>

                        {/* Market */}
                        <div className='flex flex-col gap-2'>
                            <div className='flex flex-row justify-between items-center text-sm'>
                                <p className='text-[#9CA3AF]'>Market Demand</p>
                                <p>80/100</p>
                            </div>

                            {/* Progress Bar */}
                            <div className="relative flex items-center w-full bg-gray-500/20 h-3 rounded-full">
                                <div className="bg-blue-600 h-3 rounded-full w-[85%]" style={{ width: `80%` }}>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </CardContent>
    </Card>
  )
}

export default InfoCard