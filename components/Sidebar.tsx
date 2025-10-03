'use client';

import { sidebarLinks } from '@/constants'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

const Sidebar = () => {

    const pathname = usePathname();

  return (
    <section className='sidebar'>
        <nav className='flex flex-col gap-2 items-center'>
            <Link href="/" className='mb-8 xl:ml-5 cursor-pointer xl:self-start flex items-center gap-2'>
                <Image
                 src="/icons/logo.svg"
                 width={50}
                 height={50}
                 alt='Orbith Logo'
                 className='w-full max-xl:size-14'
                />
            </Link>

            {sidebarLinks.map((item) => {
                const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`)

                return (
                    <Link href={item.route} key={item.label} className={cn('sidebar-link', {'bg-[#2A2A2D]': isActive})}>
                        <div className='relative size-6'>
                            <Image
                             src={item.imgURL}
                             alt={item.label}
                             fill
                             className={cn({'brightness-[3] invert-0' : isActive})}
                            />
                        </div>

                        <p className={cn('sidebar-label', {'!text-white' : isActive})}>{item.label}</p>
                    </Link>
                )
            })}

            {/* USER */}
        </nav>

        {/* FOOTER */}
    </section>
  )
}

export default Sidebar