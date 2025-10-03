import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'

const Navbar = () => {
  return (
    <nav className='navbar'>
        <div className="flex items-center border pl-3 gap-2 border-gray-500/30 h-[46px] rounded-md overflow-hidden md:w-[50%] xl:max-w-md w-full">
            <Image 
             src="/icons/search.svg" 
             width={16} 
             height={16} 
             alt='Search Icon'
             className='text-[#9CA3AF]'
            />

            <input type="text" placeholder="Search domains..." className="w-full h-full bg-transparent outline-none text-[#9CA3AF] placeholder-[#9CA3AF] text-sm" />
        </div>

        <div className='flex flex-row items-center md:gap-4 gap-6'>
            <Link href="/" className='flex'>
                <Image 
                 src="/icons/chats.svg" 
                 width={22} 
                 height={14} 
                 alt='Chat Icon'
                 className='text-[#9CA3AF]'
                />

                <p className='text-sm'>My Chats</p>
            </Link>

            <Link href="/">
                <Image 
                 src="/icons/notification.svg" 
                 width={16} 
                 height={28} 
                 alt='Notification Icon'
                 className='text-[#9CA3AF]'
                />
            </Link>

            <Button asChild variant="blue">
                <Link href="/">
                    Connect Wallet
                </Link>
            </Button>
        </div>
    </nav>
  )
}

export default Navbar