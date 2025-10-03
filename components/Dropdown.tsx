import React from 'react'
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuLabel, 
    DropdownMenuSeparator, 
    DropdownMenuTrigger 
} from './ui/dropdown-menu'
import Image from 'next/image'
import { Button } from './ui/button'

const Dropdown = () => {
  return (
    <>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline_sec">
                    <p>All Categories</p>

                    <Image
                    src="/icons/arrow-down.svg"
                    width={11}
                    height={16}
                    alt='Arrow Down' 
                    />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56 border border-gray-500/30 outline-none bg-[#161618]" align="start">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Billing</DropdownMenuItem>
                <DropdownMenuItem>Team</DropdownMenuItem>
                <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline_sec">
                    <p>Score: High to Low</p>

                    <Image
                    src="/icons/arrow-down.svg"
                    width={11}
                    height={16}
                    alt='Arrow Down' 
                    />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-56 border border-gray-500/30 outline-none bg-[#161618]" align="start">
                <DropdownMenuItem>Score: Low to High</DropdownMenuItem>
                <DropdownMenuItem>Score: Low to High</DropdownMenuItem>
                <DropdownMenuItem>Score: Low to High</DropdownMenuItem>
                <DropdownMenuItem>Score: Low to High</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </>
  )
}

export default Dropdown