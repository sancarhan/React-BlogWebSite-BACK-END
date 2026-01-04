import React from 'react'

const Newsletter = () => {
  return (
    <div className='flex flex-col items-center justify-center text-center space-y-2 my-32'>
      <h1 className='md:text-4xl text-2xl font-semibold'>Blog yazılarımızı asla kaçırmayın!</h1>
      <p className='md:text-lg text-gray-500/70 pb-8'>En son blog yazıları, yeni teknolojiler ve özel haberler için abone olun.</p>
      <form className='flex items-center justify-between max-w-2xl w-full md:h-13 h-12'>
       <input className='border border-gray-300 rounded-md h-full border-r-0 outline-none w-full rounded-r-none px-3 text-gray-500' type="email" placeholder='Emailinizi Giriniz'/>
       <button type='submit'  className="text-center md:px-15 px-8 h-full text-white bg-primary/80 hover:bg-primary transition-all cursor-pointer rounded-md rounded-l-none whitespace-nowrap">Abone Ol</button>
      </form>
    </div>
  )
}

export default Newsletter
