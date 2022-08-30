import React from 'react'
import { Outlet, NavLink, useLocation,} from 'react-router-dom'
import { Formulario } from '../components/Formulario'
export const Layout = () => {

  const location = useLocation()
  const url = location.pathname

  return (
    <div>
      <div className='flex md:min-h-screen'>
        <div className='w-1/4 bg-blue-900 px-5 py-10'>
            <h2 className='text-white text-4xl font-black text-center'>CRM - Clientes</h2>

            <nav className='mt-10'> 
              <NavLink className={`${url === '/clientes' ? 'text-blue-300' : 'text-white' } text-white text-2xl block mt-2 hover:text-blue-300`} to='/clientes'>
                Clientes</NavLink>
              <NavLink className={`${url === '/clientes/nuevo' ? 'text-blue-300' : 'text-white' } text-white text-2xl block mt-2 hover:text-blue-300`} to='nuevo'>
                Nuevos Clientes</NavLink>
            </nav>
        </div>

        <div className='w-3/4 p-10 md:h-screen overflow-scroll' >
        
          <Outlet />
          
        </div>
      </div>
    </div>

  )
}
