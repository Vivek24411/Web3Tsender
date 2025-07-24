import React from 'react'
import {  ConnectButton } from '@rainbow-me/rainbowkit';
import { Link } from 'react-router-dom';

const Headers = () => {
  return (
    <div className='flex items-center justify-between px-10'>
        <div className='flex items-center'>
        <img className='w-38' src="https://imgs.search.brave.com/cIPfeBAqoDbrVeA_gTrdQGqvmUJjCzSoxq5wys2DAOM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/bG9nb2FpLmNvbS91/cGxvYWRzL291dHB1/dC8yMDIyLzAyLzE2/L2I0ZTk5M2RhNTBk/OTFiZWFjMjVkOGRj/Y2U5N2ViOTk0Lmpw/Zw" alt="" />
        <h3 className='text-4xl'><i class="ri-github-fill"></i></h3>
        </div>
        < ConnectButton/>
       
    </div>
    
  )
}

export default Headers