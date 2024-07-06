import React from 'react';
import Image from 'next/image'
 

const MobileHeader = () => {
  return (
    <div>
        <div className='flex items-center justify-center h-24 border-b shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]'>
        <Image
        src="/tyn-logo.png"
        width={135}
        height={135}
        alt="Tyn Logo"
        />
        </div>
    </div>
  )
}

export default MobileHeader