import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Spinner } from '../Spinner'

export const VerCliente = () => {
  const params = useParams()
  const [cliente, setcliente] = useState({})
  const [cargando, setcargando] = useState(true)

  useEffect(() => {
    const url = `http://localhost:4500/clientes/${params.id}`
    try {
      
      const funcion = async () =>{
        const respuesta = await fetch(url)
        const resultado = await respuesta.json()
        setcliente(resultado)
      } 
      funcion()     
    } catch (error) {
      console.log(error)
    }
    setcargando(!cargando)

  }, [])

  return (
    cargando ? <Spinner /> :
    Object.keys(cliente).length === 0 ? <p>No hay resultados</p> :
      <>
      <div>
        <h1 className="font-black text-4xl text-blue-900">Ver Cliente: {cliente.nombre}</h1>
        <p className="mt-3">Informacion del cliente</p>
  
        <p className="text-4xl text-gray-500 mt-10">
          <span className="text-gray-800 uppercase font-bold">Cliente:</span>
          {cliente.nombre}
        </p>
  
  
        <p className="text-2xl text-gray-500 mt-4">
          <span className="text-gray-800 uppercase font-bold">Email:</span>
          {cliente.email}
        </p>
        { cliente.telefono && (
          <p className="text-2xl text-gray-500 mt-4">
            <span className="text-gray-800 uppercase font-bold">Telefono:</span>
            {cliente.telefono}
          </p>
        )
        }
  
        <p className="text-2xl text-gray-500 mt-4">
          <span className="text-gray-800 uppercase font-bold">Empresa:</span>
          {cliente.empresa}
        </p>
  
        { cliente.notas && (
          <p className="text-2xl text-gray-500 mt-4">
            <span className="text-gray-800 uppercase font-bold">Notas:</span>
            {cliente.notas}
          </p>
          )
        }
      </div>
      </>
    
  )
}
