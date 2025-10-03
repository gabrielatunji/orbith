import Image from 'next/image'
import React from 'react'

const SearchBar = () => {
  return (
    <div className="md:flex items-center border pl-3 gap-2 bg-[#161618] border-gray-500/30 h-[35px] rounded-md overflow-hidden md:w-[45%] xl:max-w-xs w-full hidden">
        <Image 
            src="/icons/search.svg" 
            width={16} 
            height={16} 
            alt='Search Icon'
            className='text-[#9CA3AF]'
        />

        <input type="text" placeholder="Search by name, owner, or TLD..." className="w-full h-full bg-transparent outline-none text-[#9CA3AF] placeholder-[#9CA3AF] text-sm" />
    </div>
  )
}

export default SearchBar